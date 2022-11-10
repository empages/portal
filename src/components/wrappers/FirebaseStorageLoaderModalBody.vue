<template>
  <div>
    <h4 class="mb-4">
      Firebase Settings Storage
    </h4>
    <div class="d-flex my-4">
      <div v-if="!currentUser">
        Emerald Pages Portal provides the capability to save your settings into Firebase Firestore.
        In order to respect the sensitivity of your data - all settings will be encrypted on the
        client side and then stored. To use that feature please sign in.
      </div>
      <div
        v-if="currentUser"
        class="m-auto w-full">
        <div class="my-4">
          <form @submit.prevent="syncSettings">
            <div class="input-group">
              <input
                v-model="encryptionPassword"
                type="password"
                class="form-control"
                placeholder="Encryption Password">
              <button
                class="btn btn-primary btn-sm"
                type="submit">
                Sync Settings
              </button>
            </div>
            <div class="form-check mt-1">
              <input
                id="mergeSettings"
                v-model="mergeSettings"
                class="form-check-input"
                type="checkbox">
              <label
                class="form-check-label"
                for="mergeSettings">
                Merge settings from local storage and Firestore
              </label>
            </div>
          </form>
          <div class="mt-2">
            The usage of a more secure password is recommended if you consider your settings sensitive.
            <EmConfirmation
              v-slot="{ context }"
              class="d-inline-block"
              confirmation-word="clear"
              :message="`Are you sure you want to remove your settings from Firestore?`"
              :callback="deleteSettings">
              <button
                class="btn btn-danger p-1 btn-sm"
                @click="context.show">
                Click here
              </button>
            </EmConfirmation> if you want to
            remove that data from the Firestore.
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0 d-flex">
      <div class="ms-auto me-0 d-flex">
        <button
          v-if="currentUser"
          class="btn btn-warning mx-2"
          @click="logout">
          Sign out
        </button>
        <button
          v-if="!currentUser"
          class="btn btn-secondary mx-2"
          @click="signInWithGoogle">
          Sign in with Google
        </button>
        <button
          class="btn btn-neutral"
          type="button"
          @click="firebaseContext.hide">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { initializeApp, type FirebaseApp } from "firebase/app";
import { collection, getFirestore, addDoc, getDocs, deleteDoc, updateDoc, query, where, type Firestore } from "firebase/firestore";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, type Auth, type User } from "firebase/auth"
import {computed, type ComputedRef, onMounted, type Ref, ref} from "vue";
import type {ModalContext} from "@/shared/types/modal-context";
import {decryptWithAES, encryptWithAES} from "@/shared/helpers";
import storageService from "@/services/storage-service";
import {notificationService} from "@/services/notification-service";
import EmConfirmation from "@/components/base/EmConfirmation.vue";

const props = defineProps<{
  firebaseContext: ModalContext
}>();

const emit = defineEmits(['reload:apps']);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
const currentUser: Ref<User | null> = ref(null);

const encryptionPassword: Ref<string> = ref('');
const mergeSettings: Ref<boolean> = ref(true);

function signInWithGoogle() {
  if (auth) {
    signInWithPopup(auth, new GoogleAuthProvider())
  }
}

function logout() {
  if (auth) {
    signOut(auth);
  }
}

async function getCurrentUserSettingsDoc() {
  if (!firestore) {
    return;
  }

  const settingsCollection = collection(firestore, 'settings');
  const existingSettingsQuery = query(settingsCollection, where('userId', '==', currentUser.value?.uid));
  const docsSnapshots = await getDocs(existingSettingsQuery);
  if (docsSnapshots.size > 0) {
    return docsSnapshots.docs[0];
  }

  return null;
}

async function deleteSettings() {
  const settings = await getCurrentUserSettingsDoc();
  if (settings) {
    await deleteDoc(settings.ref);
    notificationService.showSuccessToast("Stored settings have been deleted")
  }
}

async function syncSettings() {
  if (!firestore) {
    return;
  }

  let currentApplications = storageService.getApplications();
  const settingsCollection = collection(firestore, 'settings');
  const settings = await getCurrentUserSettingsDoc();
  if (settings) {
    let storedApplications = [];
    try {
      const serializedEncryptedStoredApplications = settings.data().data;
      const serializedStoredApplications = decryptWithAES(serializedEncryptedStoredApplications, encryptionPassword.value);
      storedApplications = JSON.parse(serializedStoredApplications);
    }
    catch (e) {
      notificationService.showErrorToast("Invalid settings extraction from the store");
      return;
    }

    if (mergeSettings.value) {
      const applicationsToAdd = [];
      for (const storedApplication of storedApplications) {
        if (!currentApplications.some(x => storedApplication.id === x.id)) {
          applicationsToAdd.push(storedApplication);
        }
      }

      currentApplications = [...currentApplications, ...applicationsToAdd];
    }

    const serializedApplications = JSON.stringify(currentApplications);
    const encryptedData = encryptWithAES(serializedApplications, encryptionPassword.value);

    storageService.saveApplications(currentApplications);

    await updateDoc(settings.ref, {
      userId: currentUser.value?.uid,
      data: encryptedData
    })
  }
  else {
    const serializedApplications = JSON.stringify(currentApplications);
    const encryptedData = encryptWithAES(serializedApplications, encryptionPassword.value);
    await addDoc(settingsCollection, {
      userId: currentUser.value?.uid,
      data: encryptedData
    });
  }

  notificationService.showSuccessToast("Settings has been synchronized into the Firestore");
  emit('reload:apps');
}

async function initFirebase() {
  app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));
  firestore = getFirestore(app);
  auth = getAuth(app);
  auth.onAuthStateChanged(() => {
    currentUser.value = auth?.currentUser ?? null;
  })
}

onMounted(async () => {
  await initFirebase();
})
</script>

<style scoped>
</style>

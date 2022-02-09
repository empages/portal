<template>
  <div class="row justify-content-center">
    <div class="col-md-12 col-sm-12">
      <div class="card shadow-lg border-0 rounded-lg mt-5 mx-auto">
        <h3 class="card-header display-1 text-muted text-center">
          404
        </h3>

        <span class="card-subtitle mb-2 text-muted text-center">
                Page Could Not Be Found
            </span>

        <div class="card-body mx-auto">
          <a type="button" href="/"
             class="btn btn-sm btn-primary"> Back To Home </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.card {
  width: 100%;
  max-width: 36rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: white;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.card .card-header {
  background-color: white;
  border-bottom: none;
}
</style>

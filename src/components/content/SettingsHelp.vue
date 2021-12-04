<template>
  <ul id="settings-help-content">
    <li class="mb-2">
      <i>Application</i> is an instance of <a
        target="_blank"
        href="https://emeraude.dev"
        title="Emeraude Framework">Emeraude</a>-based application
    </li>
    <li class="mb-2">
      To initialize a connection with your application you need
      to enter a valid <i>URL</i> and <i>Gateway Id</i>
    </li>
    <li class="mb-2">
      To set a valid <i>Gateway Id</i> you have to use <code>PortalGatewayOptions.GatewayId</code>
      setter of your application setup
    </li>
    <li class="mb-2">
      <strong>Emeraude Portal</strong> won't allow you to save the application
      in case there isn't a valid connection at the moment of creation/editing
    </li>
    <li class="mb-2">
      Name of the application is only for your help and can be duplicated
      with the name of other application
    </li>
    <li class="mb-2">
      All application information is stored only on your local browser storage
    </li>
    <li class="mb-2">
      <strong>Emeraude Portal</strong> has no server side so the whole data traffic
      is between your application and your browser
    </li>
    <li class="mb-2">
      No activity, usage or error logs are stored from the portal
    </li>
    <li class="mb-2">
      No marketing and analytics tools are used on the portal
    </li>
  </ul>
</template>

<style scoped lang="scss">
  #settings-help-content {
    font-size: 14px;
    padding-left: 1.21rem;
  }
</style>

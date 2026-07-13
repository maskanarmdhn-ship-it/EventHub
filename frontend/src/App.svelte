<script>
  import Login from "./pages/Login.svelte";
  import Dashboard from "./pages/Dashboard.svelte";

  let isLogin = false;

  function berhasilLogin() {
    isLogin = true;
  }

</script>

{#if isLogin}
    <Dashboard />
{:else}
    <Login onLogin={berhasilLogin} />
{/if}
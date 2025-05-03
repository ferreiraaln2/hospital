<template>
  <div class="hello">
    <h1 class="welcome-title">{{ msg }}</h1>
    
    <div class="dashboard">
      <div class="card dashboard-card">
        <div class="card-icon">
          <i class="fas fa-hospital"></i>
        </div>
        <h3>Setores</h3>
        <p>Gerencie os setores do hospital</p>
        <router-link to="/sectors" class="btn btn-primary">Acessar</router-link>
      </div>
      
      <div class="card dashboard-card">
        <div class="card-icon">
          <i class="fas fa-user-injured"></i>
        </div>
        <h3>Pacientes</h3>
        <p>Cadastre e gerencie pacientes</p>
        <router-link to="/patients" class="btn btn-primary">Acessar</router-link>
      </div>
      
      <div class="card dashboard-card">
        <div class="card-icon">
          <i class="fas fa-user-md"></i>
        </div>
        <h3>Médicos</h3>
        <p>Gerencie o corpo clínico</p>
        <router-link to="/doctors" class="btn btn-primary">Acessar</router-link>
      </div>
    </div>
    
    <div class="card mt-4">
      <h2 class="card-title">Sobre o Sistema</h2>
      <p>
        Este sistema de gestão hospitalar permite o gerenciamento completo de setores, 
        pacientes e médicos, facilitando a administração do hospital.
      </p>
      <p class="mt-4">
        Para mais informações, consulte a documentação ou entre em contato com o suporte.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dashboard-card {
  text-align: center;
  transition: transform 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.dashboard-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.dashboard-card p {
  margin-bottom: 1.5rem;
  color: #7f8c8d;
}

.dashboard-card .btn {
  display: inline-block;
}
</style>

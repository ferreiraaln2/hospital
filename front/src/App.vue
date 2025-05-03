<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">Sistema Hospitalar</h1>
        <nav class="main-nav">
          <router-link to="/" exact>Home</router-link>
          <router-link to="/sectors">Setores</router-link>
          <router-link to="/patients">Pacientes</router-link>
          <router-link to="/doctors">Médicos</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <router-view/>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Sistema de Gestão Hospitalar</p>
      </div>
    </footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.main-nav a {
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.main-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-nav a.router-link-active {
  background-color: #42b983;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  text-align: center;
  margin-top: auto;
}

/* Estilos de botões */
.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-secondary {
  background-color: #7f8c8d;
  color: white;
}

/* Estilos de formulários */
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus, textarea:focus, select:focus {
  border-color: #42b983;
  outline: none;
}

/* Estilos de tabelas */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead th {
  background-color: #f2f2f2;
  font-weight: 600;
}

tbody tr:hover {
  background-color: #f5f5f5;
}

/* Estilos de cards */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Utilitários */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>

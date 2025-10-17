import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { RecipeProvider } from './context/RecipeContext.jsx';
import Login from './components/Auth/Login/Login.jsx';
import Header from './components/Layout/Header/Header.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';
import RecipeList from './components/Recipes/RecipeList/RecipeList.jsx';
import RecipeDetail from './components/Recipes/RecipeDetail/RecipeDetail.jsx';
import RecipeForm from './components/Recipes/RecipeForm/RecipeForm.jsx';
import styles from './App.module.css';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <RecipeList />
      </main>
      <Footer />
      <RecipeDetail />
      <RecipeForm />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <AppContent />
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
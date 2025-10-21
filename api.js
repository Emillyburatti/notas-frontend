// src/api.js

const API_URL = 'http://localhost:80/api/notas'; 

export const listarNotas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Falha ao buscar notas.');
  }
  return response.json();
};

export const criarNota = async (nota) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nota),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Falha ao salvar a nota. Status: ${response.status}`);
  }
  
  return response.json(); 
};

export const atualizarNota = async (id, nota) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nota),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Falha ao atualizar a nota ${id}. Status: ${response.status}`);
  }
  
  return response.json();
};

export const deletarNota = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Falha ao excluir a nota ${id}. Status: ${response.status}`);
  }
  
  if (response.status === 204) {
    return { success: true, message: `Nota ${id} excluída com sucesso.` };
  }
  
  return response.json();
};
import React from 'react';
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    maritalStatus: '',
    genre: '',
  });

  const handleFormSubmit = () => {
    console.log(form);
    alert('Formulário enviado com sucesso!');
    setForm({
      fullName: '',
      email: '',
      maritalStatus: '',
      genre: '',
    });
  }

  const handleFormChange = (event) => {

    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const calculateProgress = () => {
    let value = 0;
    let ammountToAdd = 25;

    if(form.fullName) {
      const explodedName = form.fullName.split(' ');
      if(explodedName.length >= 2) {
        value += ammountToAdd;
      }
    }
    
    
    if(form.email) {
      let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if(emailRegex.test(form.email)) {
        value += ammountToAdd;
      }
    }

    if(form.maritalStatus) {
      value += ammountToAdd;
    }

    if(form.genre) {
      value += ammountToAdd;
    }

    return value;
  }

  const colorChange = () => {
    if(calculateProgress() === 100) {
      return 'green';
    } else {
      return '#535bf2';
    }
  }

  return (
    <div className='App'>
      <h1>progresso do formulário</h1>
      <main>
        <div className='bar-container'>
          <div className='bar' style={{width: `${calculateProgress()}%`, background: `${colorChange()}`}} ></div>
        </div>
        <div className='form-group'>
          <label htmlFor='' >Nome Completo</label>
          <input 
            value={form.fullName}
            name='fullName'
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input 
          value={form.email}
          name='email'
          onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select
            value={form.maritalStatus}
            name='maritalStatus'
            onChange={handleFormChange}
          >
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name='genre' value='masculino' onChange={handleFormChange} checked={form.genre === 'masculino'} /> Masculino
            </span>
            <span>
              <input type='radio' name='genre' value='feminino' onChange={handleFormChange} checked={form.genre === 'feminino'} /> Feminino
            </span>
          </div>
        </div>
        <button onClick={handleFormSubmit} disabled={ calculateProgress() !== 100 } >Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;

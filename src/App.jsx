import React, { useState, useEffect } from 'react';

import InputMask from 'react-input-mask';

import './App.css';

const App = () => {

  const [user, setUser] = useState({
    name: '',
    birthDate: '',
    age: '',
    phoneNumber: '',
    cpf: '',
    houseNumber: '',
    zipCode: '',
    street: '',
    neighborhood: '',
    city: '',
  });

  const handleSetUser = (userData) => (evento) => {
    if (userData === 'birthDate') {
      let data = new Date(evento.target.value);
      setUser({ ...user, [userData]: data.getTime() });

    } else {
      setUser({ ...user, [userData]: evento.target.value });
    }
  }

  const handleSetAgeUser = () => {
    let toDay = new Date();
    let userBirthDate = new Date(user.birthDate);
    let userAge = toDay.getFullYear() - userBirthDate.getFullYear();
    console.log(toDay.getMonth() > userBirthDate.getMonth() ? `Voce tem ${parseInt(userAge)} anos` : `voce tem ${(parseInt(userAge) - 1)} anos`)
    let aaa = toDay.getMonth() > userBirthDate.getMonth() ? `${parseInt(userAge)}` : `${(parseInt(userAge) - 1)}`;
    console.log(aaa)
    if (userAge >= 1) {
      setUser({
        ...user,
        age: aaa == 1 ? `${aaa} ano` : `${aaa} anos`
      });
    } else {
      setUser({
        ...user,
        age: ''
      });
    }
  }

  const handleSetUserAddress = async () => {
    try {
      let getInfo = await fetch(`https://viacep.com.br/ws/${user.zipCode}/json/`);
      let res = await getInfo.json();
      console.log(res);

      setUser({
        ...user,
        street: res.logradouro,
        neighborhood: res.bairro,
        city: `${res.localidade}-${res.uf}`,
      });

    } catch (error) {
      console.log(error);
      alert(`Erro, confira o cep! ${error}`)
    }
  }

  const handleConfirmData = () => {
    console.log(user)
  }

  return (
    <div className='container principal'>
      <div className='header container center-align'>
        <div><h4>Formulário Açovisa</h4></div>
      </div>
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input id="userName" type="text" class="validate" value={user.name} onChange={handleSetUser('name')} />
              <label for="userName">Nome</label>
            </div>
          </div>
          {/*Componente de input DATA DE NASCIMENTO*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">cake</i>
              <input id="userBirthDate" type="date" class="validate" onChange={handleSetUser('birthDate')} onBlur={handleSetAgeUser} />
              <label for="userBirthDate">Data de nascimento</label>
            </div>
          </div>
        </div>
      </div>
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">tag</i>
              <input id="userAge" class="validate" value={user.age} onChange={handleSetUser('age')} readOnly placeholder="Idade" />
            </div>
          </div>
          {/*Componente de input DATA DE NASCIMENTO*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">phone_iphone</i>
              <InputMask id="userPhoneNumber" type="text" class="validate" value={user.phoneNumber} onChange={handleSetUser('phoneNumber')} mask="(99)99999-9999" />

              <label for="userPhoneNumber">Celular</label>
            </div>
          </div>
        </div>
      </div>
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">pin</i>
              <InputMask id="userCpf" type="text" class="validate" value={user.cpf} onChange={handleSetUser('cpf')} mask="999.999.999-99" />
              <label for="userCpf">CPF</label>
            </div>
          </div>
          {/*Componente de input DATA DE NASCIMENTO*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input id="userEmail" type="email" class="validate" onChange={handleSetUser('birthDate')} />
              <label for="userEmail">Email</label>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">pin</i>
              <InputMask id="userCep" type="text" class="validate" value={user.zipCode} onChange={handleSetUser('zipCode')} mask="99999-999" onBlur={handleSetUserAddress} />
              <label for="userCep">CEP</label>
            </div>
          </div>
          {/*Componente de input DATA DE NASCIMENTO*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">home</i>
              <input id="userHouseNumber" type="number" class="validate" value={user.houseNumber} onChange={handleSetUser('houseNumber')} placeholder="Numero" />
            </div>
          </div>
        </div>
      </div>
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m12' >
            <div class="input-field col s12">
              <i class="material-icons prefix">traffic</i>
              <input id="userStreet" class="validate" value={user.street} onChange={handleSetUser('street')} placeholder="Rua" readOnly />
            </div>
          </div>
        </div>
      </div>
      {/**Linha com dois dados para exibição desktop e um por linha em mobile */}
      <div className='container' >
        <div className='row'>
          {/*Componente de input NOME*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">reduce_capacity</i>
              <input id="userNeighborhood" class="validate" value={user.neighborhood} onChange={handleSetUser('neighborhood')} placeholder="Bairro" readOnly />
            </div>
          </div>
          {/*Componente de input DATA DE NASCIMENTO*/}
          <div className='col s12 m6' >
            <div class="input-field col s12">
              <i class="material-icons prefix">location_city</i>
              <input id="userCity" class="validate" value={user.city} onChange={handleSetUser('city')} placeholder="Cidade" readOnly />
            </div>
          </div>
        </div>
      </div>
      {/**Botão para confirmar dados */}
      <div className='container'>
        <div className='row'>
          <div className='col s12 m12 center-align' >
            <a class="waves-effect waves-light btn " onClick={handleConfirmData}><i class="material-icons right">check</i>Confirmar dados</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

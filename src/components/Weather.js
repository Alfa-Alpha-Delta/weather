import React from 'react';
import './App.css';
import {getAuth, signInAnonymously} from 'firebase/auth';
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "./firebase";
import { toast} from 'react-toastify';
import { useState } from 'react';
import ButtonP from './components/Button';


function App() {

const [weatherData, setWeatherData] = useState([]);

  const getWeatherData = async () => {
    const cities = ['Tijuana', 'San Luis Rio Colorado', 'Ensenada', 'Phoenix', 'Durango'];
    const apiKey = 'cf44e93b52d564987f483061cf006652';
    const units = 'metric';
    const promises = cities.map(async city => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const data = await response.json();
      return data;
    });
    const data = await Promise.all(promises);
    setWeatherData(data);
  };

  const WeatherBox = ({ data }) => (
    <div classNameName="text-center">
      <div classNameName="card"   style={{"width" : "3rem"}}>
      <img className="card-img-top p-2 mx-auto" font-size={"2rem"} src="https://i0.wp.com/climaya.com/wp-content/uploads/2019/06/cy-logo-512-512.png?fit=512%2C512&ssl=1" style={{float : 'left', paddingRight : '9px'}} alt="Title"/>
        <h2>{data.name}</h2>
          <p>{data.weather[0].description}</p>
          <p>{data.main.temp} °C</p>
          <br></br>
      </div>
    </div>
    
  );

  const weatherBoxes = weatherData.map((data, index) => <WeatherBox key={index} data={data} />);




  const login = ()=>{
    signInAnonymously(getAuth()).then(usuario=> console.log
      (usuario));
  }



  const activarMensajes = async ()=>{
    const token = await getToken(messaging, {
      vapidKey:"BL0wh9zllWdc0a3zxEWZyj4YHo9LIfC-ZH7vf040tKoZqMGFy_OJinfx9pAxzkllyDYB0e7qwgBl9z2Sjvoh0x4"
    }).catch(error => console.log("error al generar el token paps"));

    if(token) console.log("Este es tu token: "+ token);
    if(!token) console.log("No tienes token paps")
  }
  

  React.useEffect(()=>{
    onMessage(messaging, message=>{
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    })

  }, []);

  return (
    <>
          <head>
              <meta charset="UTF-8"/>
              <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
              <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
              <title>App Clima</title>

          </head>
          <body>
              <nav className="text-center bg-dark">
                  <a className="navbar-brand" href="#">App de Clima</a>
                  <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                      aria-expanded="false" aria-label="Toggle navigation"></button>
                  <div className="text-center" id="collapsibleNavId">
                      <form className="d-flex my-2 my-lg-0">
                          <button onClick={login} className="btn btn-outline-light my-2 my-sm-0 m-2" type="submit">Ingresar</button>
                          <button onClick={activarMensajes} className="btn btn-outline-light my-2 my-sm-0" type="submit">Generar</button>
                          <ButtonP/>
                      </form>
                  </div>
              </nav>
              <div className="p-2 mb-4 bg-light rounded-3">
                  <div className="container-fluid">
                      <div className="row ">
                          <div className="col-md-7">
                              <div className="container">
                                  <div className="row">
                                  </div>
                              </div>
                          </div>
                          <div className="text-center">
                          <div className="card" style={{"width" : "18rem"}}>
                                  <img className="card-img-top p-2 mx-auto" src="https://i0.wp.com/climaya.com/wp-content/uploads/2019/06/cy-logo-512-512.png?fit=512%2C512&ssl=1" style={{float : 'left', paddingRight : '10px'}} alt="Title"/>
                              
                              </div>
                              <br/>
                              
                              <button onClick={getWeatherData} type="button" class="btn btn-primary d-block mx-auto">Get weather data</button>
                              {weatherBoxes}
                            
                          </div>
                      </div>
                  </div>
              </div>
          </body>
      </>
  );
}




function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

isPushNotificationSupported()

export default App;
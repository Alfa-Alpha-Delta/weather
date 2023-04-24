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
      <div classNameName="card"   style={{"width" : "5rem"}}>
      <img className="card-img-top p-2 mx-auto" src="https://www.clipartmax.com/png/middle/45-459357_icono-clima.png" style={{float : 'left', paddingRight : '10px'}} alt="Title"/>
          <h2>{data.name}</h2>
          <p>{data.weather[0].description}</p>
          <p>{data.main.temp} °C</p>
          <br></br>
      </div>
    </div>
    
  );

  const weatherBoxes = weatherData.map((data, index) => <WeatherBox key={index} data={data} />);




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
                  <a className="navbar-brand" href="#">El ClimaClima</a>
                  <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                      aria-expanded="false" aria-label="Toggle navigation"></button>
                  <div className="text-center" id="collapsibleNavId">
                      <form className="col-md-2 col-xs-6">
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
                          
                          
                              
                              <br/>
                              
                              <button onClick={getWeatherData} type="button" class="btn btn-primary d-block mx-auto">Obtener clima</button>
                              {weatherBoxes}
                            
                          </div>
                      </div>
                  </div>
              </div>
          </body>
      </>
  );
}






export default App;
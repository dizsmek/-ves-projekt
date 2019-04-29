//{"humidity":51.4,"temperatureC":24.8,"temperatureF":76.64,"heatIndexC":24.68,"heatIndexF":76.42}


let fahrenheit;
let weatherData = new Array;


/*--------------------FETCH--------------------*/
/*---------GETTING ARDUINO DATA---------*/
const addData = (data) => {
  document.getElementById('data').innerHTML = data;
  weatherData.unshift(data);
  console.log(weatherData[0]);
}



fetch("http://192.168.0.22/")
  .then(
    res => {
      return res.ok? res.json():Promise.reject(new Error(`Custom error: ${res.status} ${res.statusText}`));
    }
  )
  .then(data => {
    const dataObj = JSON.stringify(data);
    addData(dataObj)
  })
  .catch(err => {
    console.error(`You've got a problem with getting the ARDUINO data: ${err.statusText}`);
  });






/*---------GETTING FAHRENHEIT DATA---------*/
const fChangeDOM = (data) => {
  fahrenheit = data[0].set;
  if(fahrenheit) {
    $('.switch input').addClass('checked');
  }
}

fetch("http://localhost:3000/fahrenheit")
  .then(res => res.ok?
    res.json():
    Promise.reject({ status: res.status, statusText: res.statusText })
  )
  .then(content => fChangeDOM(content))
  .catch(err => console.error(`You've got a problem with getting the FAHRENHEIT data: ${err.statusText}`));





  /*--------------------OTHERS--------------------*/

const toggleChecked = () => {

  const fDataSwitch = () => {
    fahrenheit = !fahrenheit;
    //$('.switch input').toggleClass('checked');
    document.getElementById('switchInput').classList.toggle('checked');
    return `{"set": ${fahrenheit}}`;
  }

  fetch('http://localhost:3000/fahrenheit/1', {
    method: 'PUT',
    body: fDataSwitch(),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.ok?
      res.json():
      Promise.reject({ status: res.status, statusText: res.statusText })
    )
    .then(res => console.log(`Successful change of Fahrenheit: ${JSON.stringify(res)}`))
    .catch(err => console.error(`An error occured with changing the Fahrenheit value: ${err.responseText}`));
}


// $(".switch").on('click', toggleChecked);
document.getElementById("switchInput").addEventListener('click', toggleChecked);


















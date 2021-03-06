// Promises


// pending / waiting  ожидание
// fullfilled / resolved выполнено успешно
// rejected / failed выполнено неудачно


promise = {
  state ...,
  then(),
  resolveQueue: [
    function () {},
    function () {},
    function () {},
    function () {},
  ],
  rejectedQueue: [fnc..., fnc...]
}



const promise = new Promise(function (resolve, reject) {
  // вызвать resolve() или reject()

  setTimeout(function () {
    resolve();
  }, 2000);
});


promise.then(function (value) {
  console.log('промис перешёл в состояние resolve');
}, function (reason) {
  console.log('промис перешёл в состояние reject');
});


// - подгрузка картинок c Promise
const img_1 = 'http://s3.favim.com/mini/140529/blue-colours-galaxy-pink-Favim.com-1799653.jpg';
const img_2 = 'https://media.wired.com/photos/59268c5dcfe0d93c474309a2/master/w_1400,c_limit/BSP_054.jpg';
const img_3 = 'https://img.purch.com/w/640/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA0NC83NjMvaTAyL2FyZWEtYXJvdW5kLWFuZHJvbWVkYS1nYWxheHkuanBnPzE0MjA2NTM0NTQ=';


function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
  
    img.height = 200;
    img.src = url;
    document.body.appendChild(img);
    
    img.addEventListener('load', resolve);
    img.addEventListener('load', reject);
  });
}


// then возвращает новый Promise
// если из предыдущего then возвращается промис пинудительно (есть return с промисом), то след функция then относится к тому что в ретурне


// - чейнинг
loadImg(img_1)
  .then(() => {
    console.log('картинка 1 загружена');
  
    return loadImg(img_2);
  })
  .then(() => {
    console.log('картинка 2 загружена');
  
    return loadImg(img_3);
  })
  .then(() => {
    console.log('картинка 3 загружена');
  });


loadImg(img_1)
  .then(() => loadImg(img_2))
  .then(() => loadImg(img_3))
  .then(() => console.log('все картинки загружены'));


// - Promise.all(promoses) принимает массив из промиссов, который разрешиться // когда все промиссы из массива будут разрешены, либо зареджектится если 
// один из промисов разрешится неудачно
Promise.all([
  new Promise()...,
  new Promise()...,
  new Promise()...,
]);




// - reject
// функция-обработчик reject через .then вызывается вторым параметром
promise.then(function {
  console.log('resolved');
}, function {
  console.log('rejected');
});


// - catch
promise
  .then(() => console.log('resolved'))
  .then(() => console.log('resolved'))
  .then(() => console.log('resolved'))
  .catch(() => console.log('something wrong'));


// (!) catch выполняется только тогда, когда ни в одном из then нет обработчика reject


function loadFile_2(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status === 404) {
        reject();
      } else {
        resolve(xhr.response);
      }
    });
  }); 
}

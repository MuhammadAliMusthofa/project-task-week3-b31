function showData() {
  let name = document.getElementById('input-name').value;
  let phone = document.getElementById('input-phone').value;
  let email = document.getElementById('input-email').value;
  let subject = document.getElementById('input-subject').value;
  let message = document.getElementById('input-message').value;

  //   console.log(name);
  //   console.log(phone);
  //   console.log(email);
  //   console.log(subject);
  //   console.log(message);

  //   name = document.getElementById('input-name').value = '';
  //   phone = document.getElementById('input-phone').value = '';
  //   email = document.getElementById('input-email').value = '';
  //   subject = document.getElementById('input-subject').value = '';
  //   message = document.getElementById('input-message').value = '';

  // if (name || email || phone || subject || message == ""){
  //     alert(`that input must be not empty`)
  // }

  if (name == '') {
    alert(`name input field must not be empty`);
  } else if (phone == '') {
    alert(`phone input field must not be empty`);
  } else if (email == '') {
    alert(`email input field must not be empty`);
  } else if (subject == '') {
    alert(`subject input field must not be empty`);
  } else if (message == '') {
    alert(`message input field must not be empty`);
  } else {
    let myEmail = `zvslance@gmail.com`;

    let emailReceiver = `${myEmail}`;

    let a = document.createElement('a');
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello my name is ${name}, ${subject}, ${message}, this is my phone number : ${phone}`;

    a.click();
  }

  //dom tCreate elemen

  // let emailReceiver = `${email}`;

  // let a = document.createElement('a');
  // a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello my name is ${name}, ${subject}, ${message}, this is my phone number : ${phone}`;

  // a.click();

  //object
  // let dataObject = {
  //   name: name,
  //   email,
  //   phone,
  //   subject,
  //   message,
  // };

  // console.table(dataObject);
}

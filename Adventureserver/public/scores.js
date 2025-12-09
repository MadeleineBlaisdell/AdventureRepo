fetch("/data")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let feed = document.getElementById('feed');
        for (let i = 0; i<data.length;i++){
            let string = data.data[i].date + " : " + data.data[i].leaderboard;
        }
    })
    .catch((error)=>{
        console.log(error);
    })
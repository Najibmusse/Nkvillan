
// Firebase-konfiguration
var firebaseConfig = {
    apiKey: "AIzaSyDPFW4ZNG-mci-fDo7uL7ekn40nQMl6BLs",
  authDomain: "nkvillan-d9ee1.firebaseapp.com",
  databaseURL: "https://nkvillan-d9ee1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nkvillan-d9ee1",
  storageBucket: "nkvillan-d9ee1.appspot.com",
  messagingSenderId: "364879076800",
  appId: "1:364879076800:web:e3f37e7536d51da676fc25",
  measurementId: "G-GXSJ2EXD1D"
};

// Initialisera Firebase
firebase.initializeApp(firebaseConfig);

// Initialisera Realtime Database
var database = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById('weekly-table');
    const cells = table.querySelectorAll("td[contenteditable='true']");

    // Funktion för att ladda data från Realtime Database
    const loadData = () => {
        database.ref('weeklySchedule').once('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                cells.forEach((cell, index) => {
                    if (data[index] !== undefined) {
                        cell.textContent = data[index];
                    }
                });
            }
        }).catch((error) => {
            console.error("Error loading data: ", error);
        });
    };

    // Funktion för att spara data till Realtime Database
    const saveData = () => {
        const data = {};
        cells.forEach((cell, index) => {
            data[index] = cell.textContent;
        });
        database.ref('weeklySchedule').set(data)
            .then(() => {
                console.log("Data successfully written!");
            })
            .catch((error) => {
                console.error("Error writing data: ", error);
            });
    };

    // Ladda data när sidan laddas
    loadData();

    // Spara data vid ändring
    cells.forEach((cell) => {
        cell.addEventListener("input", () => {
            saveData();
        });
    });

    // Uppdatera datum
    const currentDate = new Date();
    const rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i - 1);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        row.cells[0].textContent = formattedDate;
    }
});

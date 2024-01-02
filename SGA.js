// ==UserScript==
// @name         SGA Monitor
// @namespace    SGA Monitor - Escala
// @version      1.0.10
// @downloadURL  https://raw.githubusercontent.com/brunomattos-b/SGA/main/SGA.js
// @updateURL    https://raw.githubusercontent.com/brunomattos-b/SGA/main/SGA.js
// @description  Exibe a escala do dia, e notifica quando o servidor tem que ir pro atendimento
// @author       Bruno Mattos Barbalho
// @match        http*://10.0.0.43/novosga/public/modules/sga.monitor
// @icon         http*://www.google.com/s2/favicons?sz=64&domain=0.43
// @grant        GM_addStyle
// ==/UserScript==

async function main()
{
    let usuario = document.querySelector("body > nav > div > div.collapse.navbar-collapse.novosga-navbar > ul.nav.navbar-nav.navbar-right > li > a").innerHTML;

    let names = ["Alessandra", "Bonin", "Dimas", "Flávia", "Joanan", "Ligia", "Luis", "Marcelo", "Mattos", "Rafael"];
    let servidor = "Unknown";

    for (var i = 0; i < names.length; i++)
    {
        if (usuario.includes(names[i]))
        {
            servidor = names[i];
            break;
        }
    }

    console.log(`Você está logado como: ${servidor}`);

    console.log("Loading... Please wait...");

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let formattedDate = ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;

    let data = [
        ["02/01/2024", "Vanessa", "Jéssica", "Dimas", "Flávia", "Joanan", "Bonin", "Marcelo", "Mattos", "Rafael", "Luis"],
        ["03/01/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Rafael", "Joanan", "Dimas", "Flávia", "Bonin", "Luis"],
        ["04/01/2024", "Vanessa", "Jéssica", "Bonin", "Dimas", "Flávia", "Luis", "Joanan", "Rafael", "Mattos", "Marcelo"],
        ["05/01/2024", "Vanessa", "Jéssica", "Marcelo", "Luis", "Rafael", "Mattos", "Bonin", "Dimas", "Flávia", "Joanan"],
        ["08/01/2024", "Vanessa", "Jéssica", "Joanan", "Bonin", "Dimas", "Flávia", "Rafael", "Marcelo", "Mattos", "Luis"],
        ["09/01/2024", "Vanessa", "Jéssica", "Luis", "Mattos", "Rafael", "Marcelo", "Flávia", "Joanan", "Dimas", "Bonin"],
        ["10/01/2024", "Vanessa", "Jéssica", "Flávia", "Joanan", "Bonin", "Dimas", "Mattos", "Luis", "Rafael", "Marcelo"],
        ["11/01/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Luis", "Rafael", "Bonin", "Flávia", "Joanan", "Dimas"],
        ["12/01/2024", "Vanessa", "Jéssica", "Dimas", "Flávia", "Joanan", "Bonin", "Rafael", "Marcelo", "Mattos", "Luis"],
        ["15/01/2024", "Vanessa", "Jéssica", "Marcelo", "Luis", "Rafael", "Joanan", "Mattos", "Bonin", "Flávia", "Dimas"],
        ["16/01/2024", "Vanessa", "Jéssica", "Bonin", "Dimas", "Flávia", "Luis", "Mattos", "Joanan", "Marcelo", "Rafael"],
        ["17/01/2024", "Vanessa", "Jéssica", "Luis", "Mattos", "Rafael", "Marcelo", "Bonin", "Flávia", "Joanan", "Dimas"],
        ["18/01/2024", "Vanessa", "Jéssica", "Joanan", "Bonin", "Dimas", "Flávia", "Rafael", "Luis", "Marcelo", "Mattos"],
        ["19/01/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Luis", "Rafael", "Dimas", "Joanan", "Bonin", "Flávia"],
        ["22/01/2024", "Vanessa", "Jéssica", "Flávia", "Joanan", "Bonin", "Mattos", "Luis", "Marcelo", "Dimas", "Rafael"],
        ["23/01/2024", "Vanessa", "Jéssica", "Marcelo", "Luis", "Rafael", "Dimas", "Bonin", "Flávia", "Mattos", "Joanan"],
        ["24/01/2024", "Vanessa", "Jéssica", "Dimas", "Flávia", "Joanan", "Bonin", "Mattos", "Rafael", "Luis", "Marcelo"],
        ["25/01/2024", "Vanessa", "Jéssica", "Luis", "Mattos", "Rafael", "Joanan", "Dimas", "Marcelo", "Bonin", "Flávia"],
        ["26/01/2024", "Vanessa", "Jéssica", "Bonin", "Dimas", "Flávia", "Luis", "Joanan", "Mattos", "Rafael", "Marcelo"],
        ["29/01/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Luis", "Rafael", "Dimas", "Bonin", "Flávia", "Joanan"],
        ["30/01/2024", "Vanessa", "Jéssica", "Joanan", "Bonin", "Dimas", "Marcelo", "Luis", "Flávia", "Rafael", "Mattos"],
        ["31/01/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Rafael", "Dimas", "Joanan", "Luis", "Flávia", "Bonin"],
        ["01/02/2024", "Vanessa", "Jéssica", "Flávia", "Joanan", "Bonin", "Mattos", "Rafael", "Marcelo", "Luis", "Dimas"],
        ["02/02/2024", "Vanessa", "Jéssica", "Marcelo", "Mattos", "Rafael", "Flávia", "Luis", "Dimas", "Joanan", "Bonin"],
    ];

    let todayData = data.find(function (entry)
                              {
        return entry[0] === formattedDate;
    });

    let employees = todayData ? todayData.slice(1) : [];
    let absentEmployees = [];

    document.querySelector("head > title").innerHTML = "Novo SGA | Loading...";
    document.querySelector("body > div.container > div > div.header > h2").innerText = "Loading...";
    document.querySelector("body > div.container > div > div.header > p").innerText = "Please wait...";
    document.querySelector("#footer > p").innerText = "Developed by Bruno Mattos";

    await sleep(1000);

    let listContainer = document.createElement("ul");

    listContainer.style.position = "fixed";
    listContainer.style.top = "10%";
    listContainer.style.left = "10px";
    listContainer.style.padding = "0";

    employees.forEach((employee) =>
                      {
        let listItem = document.createElement("li");
        listItem.style.listStyle = "none";
        listItem.style.marginBottom = "0px";
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = employee;
        checkbox.style.marginRight = "10px";

        let label = document.createElement("label");
        label.textContent = employee;
        label.style.fontFamily = "Arial, sans-serif";
        label.style.marginTop = "09px";

        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        listContainer.appendChild(listItem);
    });

    let containerElement = document.querySelector("body > div.container");
    containerElement.appendChild(listContainer);

    var textElement = document.createElement("div");
    textElement.style.position = "fixed";
    textElement.style.bottom = "10px";
    textElement.style.left = "10px";
    textElement.textContent = "Escala de 02/01/2024 a 02/02/2024 (v1.0.10)";

    document.body.appendChild(textElement);

    function sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function passwords()
    {
        let passwords = [];
        let queue = document.querySelector("#servico-1 > ul").childElementCount;

        for (let i = 1; i <= queue; i++)
        {
            let password = formatTime(document.querySelector("#servico-1 > ul > li:nth-child(" + i + ") > a").title);
            passwords.push(password);
        }
        return passwords;
    }

    function formatTime(unFormattedTime)
    {
        let formattedTime = '';
        for (let i = 9; i > 1; i--)
        {
            formattedTime += (unFormattedTime[unFormattedTime.length - i]);
        }
        return (formattedTime);
    }

    function latestTime(times)
    {
        let latest = times[0];

        for (let i = 1; i < times.length; i++)
        {
            if (times[i] > latest)
            {
                latest = times[i];
            }
        }
        return latest;
    }

    function saveCheckboxState()
    {
        let checkboxStates = {};
        let checkboxes = document.querySelectorAll("input[type='checkbox']");

        checkboxes.forEach((checkbox) =>
                           {
            checkboxStates[checkbox.value] = checkbox.checked;
        });

        localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
    }

    function getSavedCheckboxState(employee)
    {
        let checkboxStates = JSON.parse(localStorage.getItem("checkboxStates"));
        return checkboxStates && checkboxStates[employee] ? checkboxStates[employee] : false;
    }

    async function notification()
    {
        let lunch = [];

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        let currentHour = today.getHours().toString().padStart(2, '0');
        let currentMinute = today.getMinutes().toString().padStart(2, '0');
        let currentSecond = today.getSeconds().toString().padStart(2, '0');
        let currentTime = `${currentHour}:${currentMinute}:${currentSecond}`

        if (currentTime >= "11:00:00" && currentTime < "11:30:00")
        {
            lunch.push("Vanessa");
        }
        else if (currentTime >= "11:30:00" && currentTime < "12:00:00")
        {
            lunch.push("Vanessa");
            lunch.push("Dimas");
        }
        else if (currentTime >= "12:00:00" && currentTime < "12:30:00")
        {
            lunch.push("Dimas");
            lunch.push("Bonin");
            lunch.push("Ligia");
            lunch.push("Flávia");
            lunch.push("Joanan");
            lunch.push("Luis");
        }
        else if (currentTime >= "12:30:00" && currentTime < "13:00:00")
        {
            lunch.push("Bonin");
            lunch.push("Ligia");
            lunch.push("Flávia");
            lunch.push("Joanan");
            lunch.push("Luis");
        }
        else if (currentTime >= "13:00:00" && currentTime < "14:00:00")
        {
            lunch.push("Rafael");
            lunch.push("Mattos");
            lunch.push("Marcelo");
            lunch.push("Jéssica");
        }

        let checkboxes = document.querySelectorAll("input[type='checkbox']");

        checkboxes.forEach((checkbox) =>
                           {
            checkbox.addEventListener("change", () =>
                                      {
                let employee = checkbox.value;
                if (checkbox.checked)
                {
                    absentEmployees.push(employee);
                } else
                {
                    let index = absentEmployees.indexOf(employee);
                    if (index !== -1)
                    {
                        absentEmployees.splice(index, 1);
                    }
                }
                saveCheckboxState();
            });
            let savedState = getSavedCheckboxState(checkbox.value);
            checkbox.checked = savedState;
            if (savedState)
            {
                absentEmployees.push(checkbox.value);
            }
        });

        lunch = [...new Set(lunch)];
        absentEmployees = [...new Set(absentEmployees)];

        let availableEmployees = employees.filter(employee => !lunch.includes(employee))
        availableEmployees = availableEmployees.filter(employee => !absentEmployees.includes(employee))
        let attendingList = availableEmployees;


        let index = -1;
        let position = "";

        for (let i = 0; i < availableEmployees.length; i++)
        {
            if (availableEmployees[i] === servidor)
            {
                index = i;
                break;
            }
        }

        switch (index)
        {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                position = "Fixo";
                break;
            case 5:
                position = "20 minutos ou 10 na fila (Suplente 1)";
                break;
            case 6:
                position = "30 minutos ou 20 na fila (Suplente 2)";
                break;
            case 7:
                position = "30 minutos ou 20 na fila (Suplente 3)";
                break;
            case 8:
                position = "Suplente 4";
                break;
            case 9:
                position = "Suplente 5";
                break;
        }

        if (document.querySelector("#servico-1 > ul").children[0] === undefined)
        {
            attendingList = availableEmployees.slice(0, 5);
            document.querySelector("head > title").innerHTML = "[0] Fila vazia";

            if (servidor === "Alessandra")
            {
                document.querySelector("body > div.container > div > div.header > p").innerText = `[0] Fila vazia | Você está logado como Alessandra - Chefe do atendimento`;
            }
            else
            {
                if (index !== -1)
                {
                    document.querySelector("body > div.container > div > div.header > p").innerText = `[0] Fila vazia | Sua posição atual é: ${position}`;
                }
                else
                {
                    document.querySelector("body > div.container > div > div.header > p").innerText = `[0] Fila vazia | Você está no seu horário de almoço ou ausente`;
                }
            }

            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");

            console.log(`Funcionários ausentes: ${absentEmployees}`);
            console.log(`Funcionários em horário de almoço: ${lunch}`);
            console.log(`funcionários disponíveis: ${availableEmployees}`);
            console.log(`Funcionários atendendo: ${attendingList}`);
            console.log(`Tempo de espera: Fila vazia`);
            await sleep(7000);
            return notification();
        }

        let largestTime = latestTime(passwords());
        await sleep(7000);
        let waitTime = latestTime(passwords());
        let minutes = parseInt(waitTime[3] + waitTime[4]);
        let queue = document.querySelector("#servico-1 > ul").childElementCount;

        console.log(`Funcionários ausentes: ${absentEmployees}`);
        console.log(`Funcionários em horário de almoço: ${lunch}`);
        console.log(`Funcionários disponíveis: ${availableEmployees}`);

        if (largestTime === waitTime)
        {
            attendingList = availableEmployees.slice(0, 5);
            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");
            console.log(`Funcionários atendendo: ${attendingList}`);
        }
        else if (currentTime >= "16:00:00")
        {
            attendingList = availableEmployees.slice(2, 10);
            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");
            console.log(`Funcionários atendendo: ${attendingList}`);
        }
        else if (waitTime >= "00:30:00" || queue >= 20)
        {
            attendingList = availableEmployees.slice(0, 8);
            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");
            console.log(`Funcionários atendendo: ${attendingList}`);
        }
        else if (waitTime >= "00:20:00" || queue >= 10)
        {
            attendingList = availableEmployees.slice(0, 6);
            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");
            console.log(`Funcionários atendendo: ${attendingList}`);
        }
        else
        {
            attendingList = availableEmployees.slice(0, 5);
            document.querySelector("body > div.container > div > div.header > h2").innerText = attendingList.join(" | ");
            console.log(`Funcionários atendendo: ${attendingList}`);
        }


        if (largestTime === waitTime)
        {
            document.querySelector("head > title").innerHTML = "[0] Fila vazia";

            if (servidor === "Alessandra")
            {
                document.querySelector("body > div.container > div > div.header > p").innerText = `[0] Fila vazia | Você está logado como Alessandra - Chefe do atendimento`;
            }
            else
            {
                document.querySelector("body > div.container > div > div.header > p").innerText = `[0] Fila vazia | Sua posição atual é: ${position}`;
            }

            console.log(`Tempo de espera: Fila Vazia`);
        }
        else
        {
            document.querySelector("head > title").innerHTML = `[${queue}] ${waitTime}`;

            if (index !== -1)
            {
                if (currentTime >= "16:00:00")
                {
                    if (attendingList.includes(servidor))
                    {
                        document.querySelector("body > div.container > div > div.header > p").innerText = `[${queue}] Tempo de espera: ${waitTime} | Atenção: Ir pro guichê e finalizar os atendimentos!`;
                    }
                    else
                    {
                        document.querySelector("body > div.container > div > div.header > p").innerText = `[${queue}] Tempo de espera: ${waitTime} | Expediente sendo encerrado...`;
                    }
                }
                else
                {
                    document.querySelector("body > div.container > div > div.header > p").innerText = `[${queue}] Tempo de espera: ${waitTime} | Sua posição atual é: ${position}`;
                }
            }
            else
            {
                if (servidor === "Alessandra")
                {
                    document.querySelector("body > div.container > div > div.header > p").innerText = `[${queue}] Tempo de espera: ${waitTime} | Você está logado como Alessandra - Chefe do atendimento`;
                }
                else
                {
                    document.querySelector("body > div.container > div > div.header > p").innerText = `[${queue}] Tempo de espera: ${waitTime} | Você está no seu horário de almoço ou ausente`;
                }
            }

            console.log(`Tempo de espera: ${waitTime}`);
        }

        console.log('\n'.repeat(38));

        if (attendingList.includes(servidor) && largestTime !== waitTime)
        {
            new Notification("Atenção! Ir pro guichê!");
            return notification();
        }
        else
        {
            return notification();
        }
    }
    return notification();
}
main();

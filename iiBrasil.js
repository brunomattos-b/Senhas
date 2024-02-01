// ==UserScript==
// @name         Senhas iiBrasil
// @namespace    Senhas_iiBrasil
// @version      1.0.0
// @downloadURL  https://raw.githubusercontent.com/brunomattos-b/senhas/main/iiBrasil.js
// @updateURL    https://raw.githubusercontent.com/brunomattos-b/senhas/main/iiBrasil.js
// @description  Calcula a quantidade de senhas e o maior tempo de espera
// @author       Bruno Mattos Barbalho
// @include      https://limeira.iibrasil.com.br/atende/atende_dashboard.php*
// @icon         http*://www.google.com/s2/favicons?sz=64&domain=0.43
// @grant        GM_addStyle
// ==/UserScript==

async function main()
{
    function sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function passwords()
    {
        let passwords = [];
        let queue = document.querySelector("#tabela_proximos > tbody").childElementCount;

        for (let i = 1; i <= queue; i++)
        {
            let password = formatTime(document.querySelector("#tabela_proximos > tbody > tr:nth-child(" + i + ") > td:nth-child(3)").innerHTML);
            passwords.push(password);
        }
        console.log(passwords);
        return passwords;
    }

    function formatTime(unFormattedTime)
    {
        let formattedTime = '';
        for (let i = 8; i > 0; i--)
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
            if (times[i] < latest)
            {
                latest = times[i];
            }
        }
        return latest;
    }


    function getCurrentTime()
    {
        let now = new Date();

        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');

        let currentTime = hours + ':' + minutes + ':' + seconds;

        return currentTime;
    }

    function matchesURL()
    {
        return window.location.href.startsWith('https://limeira.iibrasil.com.br/atende/atende_dashboard.php#atende$$');
    }

    function getTimeDifference(inputTime) {
        // Get the current time
        var currentTime = new Date();

        // Parse the input time
        var inputTimeArray = inputTime.split(':');
        var inputDate = new Date();
        inputDate.setHours(parseInt(inputTimeArray[0], 10));
        inputDate.setMinutes(parseInt(inputTimeArray[1], 10));
        inputDate.setSeconds(parseInt(inputTimeArray[2], 10));

        // Calculate the difference in milliseconds
        var timeDifference = inputDate.getTime() - currentTime.getTime();

        // Convert milliseconds to "HH:MM:SS"
        var differenceInSeconds = Math.abs(timeDifference) / 1000;
        var hours = Math.floor(differenceInSeconds / 3600);
        var minutes = Math.floor((differenceInSeconds % 3600) / 60);
        var seconds = Math.floor(differenceInSeconds % 60);

        // Format the result
        var result = padWithZero(hours) + ':' + padWithZero(minutes) + ':' + padWithZero(seconds);

        return result;
    }

    // Function to pad a number with zero if it's a single digit
    function padWithZero(number) {
        return number < 10 ? '0' + number : number;
    }
    // Check if the current URL matches the pattern

    if (matchesURL())
    {
        // Your script code goes here
        document.querySelector("head > title").innerHTML = "Loading...";
        await sleep(1000);
        async function refresh()
        {
            if(!document.querySelector("#tabela_proximos > tbody > tr:nth-child(1) > td:nth-child(3)"))
            {
                document.querySelector("head > title").innerHTML = `[0] Fila vazia`;
                document.querySelector("#content_pages > div.row.proximos_fila > h4").innerHTML = `[0] Vazio`;
                await sleep(1000);
                refresh();
            }
            else
            {
                let queue = document.querySelector("#tabela_proximos > tbody").childElementCount;
                var waitTime = getTimeDifference(latestTime(passwords()));
                console.log(`Tempo de espera = ${waitTime}`);
                document.querySelector("head > title").innerHTML = `[${queue}] ${waitTime}`;
                document.querySelector("#content_pages > div.row.proximos_fila > h4").innerHTML = `[${queue}] ${waitTime}`;
                await sleep(1000);
                refresh();
            }
        }
        refresh();
    }
}
main();

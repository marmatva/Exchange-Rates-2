export default `<header>
<h1>Exchange Rate</h1>
</header>
<main>
<header class="rate-options-tabs">
    <h2 class="tab-option-rate active-tab" id="exchange-rate">Get Exchange Rates</h2>
    <h2 class="tab-option-rate" id="convert-currency">Convert to Currencies</h2>
</header>
<main>
    <section class="menu exchange-rate-menu">
        <form action="" class="" name="exchange-rate-form">
            <label for="exchange-rates-currency">
                <select class="currencies-selector" name="exchange-rates-currency" id="exchange-rates-currency">
                    <option value="N/A" selected disabled>Please select a currency</option>
                </select>
            </label>
            <label for="exchange-rate-date">
                <input type="date" name="exchange-rate-date" id="exchange-rate-date" min="2000-01-01">
            </label>
                <input type="submit" value="Get Rates" id="request-exchange-rate">
        </form>
    </section>
    <section class="menu convert-currency-menu display-none">
        <form action="" class="" name="convert-currency-form">
            <label for="convert-currency-from">
                <p>From</p>
                <select class="currencies-selector" name="convert-currency-from" id="convert-currency-from">
                    <option value="N/A" selected disabled>Please select a currency</option>
                </select>
            </label>
            <label for="convert-currency-to">
                <p>To</p>
                <select class="currencies-selector" name="convert-currency-to" id="convert-currency-to">
                    <option value="N/A" selected disabled>Please select a currency</option>
                </select>
            </label>
            <label for="convert-currency-amount">
                <input type="number" name="convert-currency-amount" id="convert-currency-amount" placeholder="Amount">
            </label>
            <label for="convert-currency-date">
                <input type="date" name="convert-currency-date" id="convert-currency-date" min="2000-01-01">
            </label>
                <input type="submit" value="Convert" id="request-convert-currency">
        </form>
    </section>
</main>
</main>
<div class="background-container">
<div class="background-wave">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L12.6,85.3C25.3,75,51,53,76,48C101.1,43,126,53,152,80C176.8,107,202,149,227,154.7C252.6,160,278,128,303,138.7C328.4,149,354,203,379,218.7C404.2,235,429,213,455,192C480,171,505,149,531,133.3C555.8,117,581,107,606,128C631.6,149,657,203,682,202.7C707.4,203,733,149,758,128C783.2,107,808,117,834,144C858.9,171,884,213,909,224C934.7,235,960,213,985,202.7C1010.5,192,1036,192,1061,208C1086.3,224,1112,256,1137,266.7C1162.1,277,1187,267,1213,229.3C1237.9,192,1263,128,1288,122.7C1313.7,117,1339,171,1364,170.7C1389.5,171,1415,117,1427,90.7L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></path></svg>
</div>
<div class="background-continuation"></div>
</div>
<footer>
<p>
    Project by <a href="https://github.com/marmatva">MARMATVA</a>
</p>
</footer>
`
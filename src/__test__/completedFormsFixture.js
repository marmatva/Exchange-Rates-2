export default `<main>
    <section class="menu exchange-rate-menu">
        <form action="" class="" name="exchange-rate-form">
            <label for="exchange-rates-currency">
                <select class="currencies-selector" name="exchange-rates-currency" id="exchange-rates-currency">
                    <option value="USD" selected >Please select a currency</option>
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
                    <option value="USD" selected disabled>Please select a currency</option>
                </select>
            </label>
            <label for="convert-currency-to">
                <p>To</p>
                <select class="currencies-selector" name="convert-currency-to" id="convert-currency-to">
                    <option value="EUR" selected disabled>Please select a currency</option>
                </select>
            </label>
            <label for="convert-currency-amount">
                <input type="number" value ="5864" name="convert-currency-amount" id="convert-currency-amount" placeholder="Amount">
            </label>
            <label for="convert-currency-date">
                <input type="date" name="convert-currency-date" id="convert-currency-date" min="2000-01-01" value="2021-10-07">
            </label>
            <input type="submit" value="Convert" id="request-convert-currency">
        </form>
    </section>
</main>`
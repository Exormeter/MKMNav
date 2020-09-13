# MKMNav

This is a little App that is designed to make Magic: The Gathering trades easyier. A normal trade between Magic players makes haeavy use of the 
market place cardmarket.com to search the right card in the right language from a seller in the own contry to determin the real price of a magic card.
Not only takes it a bit of effort to browser the side on a mobile device, but after the right card was found, the condtion, language and all these parameter
need to be matched with the card in question. And this is only one card. This process is when repeated for every card invovled in the trade to find a
fair trade for both players.

With this App, I tried to streamline this process. First of all, after open the app, you can imedatly start searching for cards by typing the card cardname
into the search filed. There is an autocomplete featchure, so the first 3 or 4 letters of the cardname are often enough. Afterwards you get the card in all 
differnt sets, so you can choose the card in question. The filters that are applyed to the search are pre configurable by the user. Since a card is often in english, Near Mint and from a seller in germany in my example, I preconfigured my filter for these parameters. If some card is differnet from these parameter, 
they can be changed easyly without changing the preconfigured filter. The programm find the first card that matches the filter criteria, which is the cheapest
price.

The API used is the cardmarket.com API, so the prices match the prices listed on the normal website. 

The App is in the Android Playstore and can be downloaded here: https://play.google.com/store/apps/details?id=com.ExorApps.TradeNav

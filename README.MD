# WaifuReal?

_WaifuReal?_ is an experimental game inspired by [This Waifu Does Not Exist.](https://www.thiswaifudoesnotexist.net/) 

The concept is simple: you are given two [waifu](https://www.dictionary.com/e/fictional-characters/waifu/) and you are asked to pick which one is "real" -- that is, sourced from an actual show, manga etc. The other is created from a neural net. You can see an example below:

## Desktop

 ![waifu_desktop](assets/waifu_desktop.png)

## Mobile



![waifu_mobile](assets/waifu_mobile.png)



You just click on the one you think is more believable. There are just two provides right now, one for real and one for fake:

* *This Waifu Does not Exist* provides fake images and we use a name generator to give them a believable name
* *MyAnimeList* is queried for _real_ characters in real time.

It has some flaws, mostly;

1. The neural net ones have a consistent style more or less and bright popping colors
2. MAL artwork varies a lot

This makes it pretty easy but it was fun to throw together anyway.

## Building and using it

### Server

`node index.js`

### Client

`npm run serve`

## Future Improvements

1. Tests. I skipped out on a bunch of these since this was just a fun hack project
2. Better real backend or more varied "fake" backends to make it trickier. More sources of data would make it more difficult for sure

PRs welcome.
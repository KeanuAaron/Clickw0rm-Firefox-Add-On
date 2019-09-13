# Clickw0rm
A click intercepter.

# a wut???
So, I created this add-on mostly for myself, though it could be use for other peoples uses.
I normally have a written automated bot that will gather movie links from websites like putlocker, seriesonline8,
123movies and so on. However after collecting a wide amount, I wanted a way to select new uploads for movies of my choice,
as I don't particularly want a link to every single movie that comes out.. So I created Clickw0rm.

# what does it do ?
Clickw0rm, once activated will ask you to select an element that is constant on the page. In it's native case,
a link to watch a particular movie on a website, since they will all share a common class name. Once you have selected
that link, it will know what to listen for from then on out.

From there, you can start selecting what particular movie links you want, and don't even worry about the page moving you
on to the next page following the link. Clickw0rm prevents the links from working while activated thanks to javascripts
`event.preventDefault()` method!

For now Clickw0rm embeds the links on the very bottom of the page using `document.createElement()` so that we could scrape that
data easier.

Feel free to expand its capabilities or even use and test for yourself! I look forward to hearing from you!


# What did I learn
Well, first and foremost, my javascript was basic at best. By taking on this challenge I was really forced to learn about
event listeners and adding new elements dynamically into a website, something I never thought about doing before.

Aside from that, online movie websites have a frequent amount of *annoying* pop ups. So to prevent that I had to download a
pop up blocker extension, and came across everything I needed to learn about the structure of creating my own firefox extensions.
Having my script written already, it didn't take my much time to understand how to piece the puzzle of turning clickw0rm
into a firefox extension.

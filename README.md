# travtools
Random scripts that I use for my Traveller RPG. Some of this (allegiances, for instance) is specific to my Concordancy game, while others are more general purpose.

# How to use
These are all command line javascript files using NodeJS. You will need a NodeJS installation in order to use these.

## Sysgen
Generates a single Traveller system based on modified Classic Traveller book 6 rules. I have hacked on the atmosphere generation rules quite a bit, because I do not care for the large number of shirtsleeve worlds that book created. This tool takes a number of command line options:
-d          generate a system without favoring main worlds
--forceNoGG force no gas giants in this system
-h          display this help
-g          force gas giants in this system
-n [name]   name the system
-r          majority of breathable worlds should have reducing (A) atmospheres
-u [UPP]    upp used for this system (will generate one if not supplied)
-v          verbose mode

For a fairly standard book 6 system, run this with the following options:
`node sysgen`

I favor a very hostile universe, so I tend to use teh following:
`node sysgen -d -r`

## Secgen
Generates a Traveller sector. By default, this will create a file appropriate for use with the Traveller Map custom tools (https://travellermap.com/doc/custom), but it also has the ability to run sysgen on every system in the sector, creating a csv file for each system. This tool takes a number of command line options:
-a              generate allegiances and world names
-b              generate brown dwarfs
-d              generate a sector without favoring main worlds
-e              exclude fusing stars (O-M class)
-h              display this help
-n [name]       name of sector
-o              override population with curve
-p              populate the sector
-r              majority of breathable worlds should have reducing (A) atmospheres
-s              generate system files as csvs
--subsector [#] generate a single subsector (1-15)
-v              verbose mode

For a standard Traveller Map sector, run this with the following options:
`node secgen -n 'My cool sector' -p`

For a hostile Traveller sector, run:
`node secgen -n 'My deadly sector' -d -r -p`

To generate brown dwarfs, add the -b option.

There are a couple of options that I added specifically for my Concordancy Traveller universe, as well as to adjust existing Traveller maps:

Option -a, to generate allegiances and world names, uses data from allegiances.js. This is currently filled with information for a Traveller universe I run called the Concordancy, but you may replace that with whatever data you wish.

Option -o uses a curve to adjust population. My Concordancy game is set in the Carina sector, which is a frontier sector, and this generates a sector where the population goes from normal (at the bottom of the map) to 0 (at the top).

Option -e is mainly intended to be used with existing sectors, to create brown dwarfs while excluding other stars. You will then have to hand-merge this new data into your existing sector.
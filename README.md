# travtools
Random scripts that I use for my Traveller RPG. These are all Node.js scripts, so they can be run with "node [command]". For instance:

```
node world.js -f
```

# secgen

This command is used for generating full sectors and subsectors. It is based on the Classic Traveller Book 6 rules, modified with additional atmosphere generating rules, along with some experimental systems for generating sectors with fewer shirtsleeve worlds. It outputs the data to the console, so it should be redirected into a file. I use this with the -s option, which generates csv files for each system using the sysgen module. 

## Generate a normal Traveller sector
```
node secgen -n [name] > name.txt
```

## Generate an experimental Traveller sector without the bias towards shirtsleeve worlds and sunlike stars that the normal rules have
```
node secgen -n [name] -d -b -p > name.txt
```

secgen -- generate a modified classic Traveller sector
Note: I have updated star and atmosphere generation rules
Usage: secgen -n [name of sector]
--------
-a              generate allegiances and world names
-b              generate brown dwarfs
-d              generate a sector without favoring main worlds
-e              exclude fusing stars (O-M class)
-h              display this help
-n [name]       name of sector
-o              override population with curve
-p              populate the sector
-s              generate system files as csvs
--subsector [#] generate a single subsector (1-15)
-v              verbose mode

# sysgen

This command generates a single solar system based on the classic Traveller book 6 rules. Atmosphere generation is slightly modified, and options exist to skew generation away from shirtsleeve worlds. Outputs csv data on the console suitable for importing into a spreadsheet.

```
node sysgen -n [name] > name.csv
```

This comand can also be used to generate an extended book 6 system for a system where the main world UPP already exists:

```
node sysgen -n [name] -g|--forceNoGG -u [UPP] > name.csv
```
Note the -g and --forceNoGG switches, which force the presence or absence of gas giants.

sysgen -- generate modified classic Traveller book 6 worlds
Note: I have updated star and atmosphere generation rules
--------
-d          generate a system without favoring main worlds
--forceNoGG force no gas giants in this system
-h          display this help
-g          force gas giants in this system
-n [name]   name the system
-u [UPP]    upp used for this system (will generate one if not supplied)
-v          verbose mode

# world

This command generates a few extra tags that I use in my game. These are loosely based on the world tags in Stars Without Numbers.

world -- generate extra world information
--------
-h          display this help
--temp      generate temperature data for a main world
-b          generate biosphere data for a main world
-t          generate a set of tags for a main world
-f          generate a full set of temperature, biosphere, and tags for a main world
-v          verbose mode

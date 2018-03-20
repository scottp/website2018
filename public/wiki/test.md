UPDATE: 2014 for Arduino V1+ - Michael Cooper reminded me today that
there is now a better way.

 See also:

-   [Teensy Console and Serial](Teensy_Console_and_Serial "wikilink")
    where I combine use of PROGMEM strings and fprintf for output.
-   <http://forum.arduino.cc/index.php/topic,86209.0.html>
-   <http://playground.arduino.cc/Learning/Memory>

# In C Strings use Memory

Skipping why this is the case, you can imagine on an Arduino 168 with 1K
of RAM, this could easily become a big problem. Especially if you are
writing an HTTP server.

The solution is ugly, and this is my attempt at making it prettier.

The above examples show that we are using a heap of RAM for each, of
what should appear to be a static string.

You will find heaps of references on why it is using RAM. For now, trust
me, it is using real RAM. Every string in your project is taking up real
RAM. And when you only have 1K or perhaps 2K this becomes a problem.

What is ram used for - generally the amount of ram you use in your
project is fairly fixed. If you have an int it is 2 bytes all the time.
Each time you call a subroutine or method, your stack uses more memory,
and programs can take unexpected routes - so keep your memory small.

## Solution 1 - External

There are some solutions:

-   Stick your static content into the EEPROM (although this is only 512
    bytes, while program ram is about 14K, or 30K on a 328).
-   Store it on an external device - useful for really large things,
    like web resources. A async\_labs WiShield has space.

## Solution 2 - PROGMEM as per the Examples

The solution that most people suggest is as follows:

An alternative to this example is to first copy the string.

There are some problems with these examples:

-   They require you to know what you are doing with the string. What if
    you wanted to put it in a log, or send it over Ethernet and Serial.
-   In the second example you have to know how big your biggest
    strings are.

So here is my example which pulls it together:

## Solution 3 - PROGMEM copied to a buffer, using normal print

The above example allows us to use any PROGMEM strings for any purpose.
But remember you can only deal with one at a time. This is because there
is only a single reused buffer. Technically we could also make the
buffer outside of the routine, to allow it to be used directly. or for
other things.

For most Arduino code this won't matter much, but you don't want to use
this function inside an interrupt, or using some form of scheduler.

## Solution 4 - Simpler is better

This solution uses preprocessor functions to do the work.

The adafruite wave shield uses the following code:

You can't use these strings for anything, as you need a new define and
function for each thing you want to write to, but it does make your code
much simpler... I am working on improving the usability.

And now my own version... really just some renames:

After about an hours work that is about as close as I can come to being
simple. The problem... you need to create a method for each thing, and
sometimes they need other parameters. There doesn't seem to be a generic
way.

## Worth it ?

Here are some numbers:

-   Used 446 bytes of text to print to the serial port
-   NO Data (base line) compile 2236 bytes, free memory 1836
-   Serial.print("strings") compile 2752 bytes, free memory 1390
-   SerialPrint("strings") compile 2778 bytes, free memory 1836

Now write a HTTP server, lots of client debugging etc, and yes it was
worth it. The end result is also very easy to read:

TODO: Add Github project files for test code.

## References

-   <http://www.nongnu.org/avr-libc/user-manual/FAQ.html#faq_rom_array>

<Category:Arduino>

# juniorTA

During the pandemic, the class I was a TA for submitted homework through Google Classroom.
I was to grade on completeness and validate submissions against empty/unrelated files
(eg submitting Spanish homework for a math assignment). 
I used Google API to match the submission folder and each of the 144 students, 
leading to a **400% increase in efficiency and 100%** accuracy.
Furthermore, because this checked the owner of the file through Drive, 
I also bypassed unnamed files (where I would need to chase down the student).

The script is compiled in index.js for all five sections (period 1-5). credentials.json is used to generate token.json
which allows Google API to crawl through your folders and find the corresponding one you input.

This simply checks for those who did not submit at all: I would still have to manually ensure each submission was
valid: not an empty/unrelated file. 

![example](./juniorTA.png)

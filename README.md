# csc480-eight-queens

## For Prof.Battifarano
Latest build 0.5 is located [here](https://github.com/nklnkl/csc480-eight-queens/releases/tag/0.5)

Project Presentation is located [here](https://docs.google.com/presentation/d/1twPRI_RlNdrgKMjyvBhqdrHlWd8OMO-Jpkvb7hcwPqQ/edit?usp=sharing)

- Current Bugs
    * Display will be distorted if N > 9. This is due to padding/spacing issue for pieces that have two or more numeric place values. Possibility that report will be rendered outside of CL and into a GUI file?

## Latest Report as of 0.5
### Single Rotation
```
Unique Solutions: 92

Start time: 2018-11-02T04:02:27-04:00
End time: 2018-11-02T04:02:28-04:00

Start time (Unix Epoch): 1541145747639
End time (Unix Epoch): 1541145748920

Search Time: 1281 milliseconds

Memory Allocated: 16.596992 Mb
Memory Usage: 8.48096 Mb

# of Search: 951017
# of Increments: 951016
# of Valid Moves: 76162
# of Backtracks: 76162
```
### Full Rotation
```
Rotated Solutions: 736
Unique Solutions: 92

Start time: 2018-11-02T04:15:14-04:00
End time: 2018-11-02T04:15:20-04:00

Start time (Unix Epoch): 1541146514807
End time (Unix Epoch): 1541146520738

Search Time: 5931 milliseconds

Memory Allocated: 12.402688 Mb
Memory Usage: 8.342152 Mb

# of Search: 7608129
# of Increments: 7608128
# of Valid Moves: 564880
# of Backtracks: 564880
```

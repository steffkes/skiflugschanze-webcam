# skiflugschanze webcam

## timelapse from images

``` bash
ffmpeg -framerate 30 -pattern_type glob -i '*.jpg' \
  -c:v libx264 -pix_fmt yuv420p out.mp4
```

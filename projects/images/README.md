# Images

first of all:

```npm install @studiohyperdrive/ngx-images```

Import the Image module in your module:
```
import { ImagesModule } from '@studiohyperdrive/ngx-images';

@NgModule({
	imports: [
		ImagesModule
	]
})

```
## 1. progressive loading component
The component first renders a blurred version of the low-resolution image. Once the high-resolution image is loaded it will be rendered on top. Small animations make sure that the transitions are smooth.

On very slow networks the low-resolution image will also need a litle time to load. That is why there is a solid color container as placeholder. You can customise this color. 

**tip:** use a very small image (as big as an icon) **as low-resolution image, a file smaller than 2kb is ideal**. Don't worry, the blur will make sure the image doesn't appear pixelated. 

**usage:**

```
<progressive-image-loading 
    lowResImg="https://link/to/low/resolution/image"
	highResImg="https://link/to/high/resolution/image">
</progressive-image-loading>

```
**options:**
- `className: string  => sets a chosen classname on image wrapper`
- `backgroundColor: string => sets background-color of placeholder`


## build information

It is build with:
- Angular CLI : `11.2.1` 
- Angular: `11.2.1`
- nodejs: `12.19.0`
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.




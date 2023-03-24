import Bundler from 'parcel-bundler';
import Handlebars from 'handlebars';
import Path from 'path';
import fs from 'fs';

const file = Path.join(__dirname, './public/index.html');
const outDir = Path.join(__dirname, '../backend/myapp/static/react');

const options = {
  outDir,
  outFile: 'index.html',
  publicUrl: '/static/react/',
  watch: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
  target: 'browser',
  cache: process.env.NODE_ENV === 'production'
};

const templateFolder = Path.resolve(Path.join(__dirname, '../backend/myapp/templates'));
const handlebarsTemplatePath = Path.resolve(
  Path.join(__dirname, './public/handlebars_template.html')
);

const bundler = new Bundler(file, options);

function getReactURL(entryPointHTML: string) {
  const regex =
    /(<script src="\/static\/react\/)(.*\.js)("><\/script>\n?)/g;
  return regex.exec(entryPointHTML)[2];
}

Handlebars.registerHelper('if_eq', function (a: any, b: any, opts: any) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

function generateHTML(reactFileName: string): string {
  const templateString = fs.readFileSync(handlebarsTemplatePath, 'utf-8');
  const template = Handlebars.compile(templateString);
  return template({
    reactUrl: `react/${reactFileName}`,
    environment: process.env.SERVER_ENV
  });
}

bundler.on('bundled', (bundle: any) => {
  const entryPointHTML = fs.readFileSync(bundle.name, 'utf-8');
  const reactUrl = getReactURL(entryPointHTML);
  const HTML = generateHTML(reactUrl);

  fs.writeFile(`${templateFolder}/my_app_react.html`, HTML, (error: any) => {
    if (error) {
      console.log(error);
    }
    console.log('my_app_react.html django template generated successfully');
  });
});

bundler.bundle();

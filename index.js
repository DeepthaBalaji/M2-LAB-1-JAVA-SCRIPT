const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

const tempcourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
    );


    const templateHTMLCourse = fs.readFileSync(
        `${__dirname}/template/templatecourse.html`,
        'utf-8'
    );
        //function replaceTemplate(htmlStr, course){
        // const replaceTemplate = (htmlStr, course) => {
        // let output = htmlStr. replace (/{%NAME%}/g, course.courseName);
        // output = output. replace (/{%IMAGE%}/g, course. image);
        // output = output. replace (/{%FROM%}/g, course.from);
        // output = output .replace(/{%INSTRUCTOR%}/g, course.instructor);
        // output = output. replace(/{%CREDITS%}/g, course.credits);
        // output = output. replace(/{%DESCRIPTIONS%}/g, course.description);
        // output = output. replace(/{%ID%}/g, course. id);
        // return output;
        // }
const dataobj = JSON.parse(tempcourse);
//Create Server
//const server = httpServer. createServer(function (req, res) {// call back function
const server = httpServer. createServer((req, res) => {// call back function

// const urlParameter = url.parse (req.url, true);
// console.log (JSON.stringify(query));
// console.log (JSON.stringify(pathname);
const {query, pathname} = url.parse(req.url, true);

if (query.id){ // if there is query parameter named id
// Courses page
if (pathname === '/' || pathname.toLowerCase() === '/courses'){
res.writeHead(200, {
'Content-type': 'text/html'
});
const course = dataobj[Number(query.id)];
const strCourseName = JSON.stringify(course);
const courseHTML = replaceTemplate(templateHTMLCourse, course);
//res.end(` We received our first request from the client at resource ${pathname.toLowerCase()} with query parameter ${query.id}
//${JSON.stringify(course)}
//`)
res.end(courseHTML);
}
else{
    res.writeHead(404, {
        'Content-type': 'text/html'
        });
        res.end('resource not found' )
}

}

});
server.listen(8000, 'localhost',function()
{
    console.log('listening to requests on port 8000');
});
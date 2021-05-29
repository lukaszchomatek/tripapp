const app = require('../server')
const mongoose = require('mongoose')
const Comment = require('../models/Comment')
const Place = require('../models/Place')
const supertest = require('supertest')
const { TestWatcher } = require('jest')

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestTripappDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
});
  
afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

test('GET /comments/:placeid', async () => {
    //dodajemy miejsce testowe
    let ipi = new Place({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    })
    ipi = await ipi.save()
    
    // wczytujemy miesce z bazy, żeby mieć jego _id
    //console.log(ipi)

    let comment = new Comment({
        nick: 'lukas',
        title: 'good place',
        content: 'awesome place',
        rate: 5,
        dateOfVisit: Date.now(),
        commentDate: Date.now(),
        place: ipi._id
    })

    comment = await comment.save()

    await supertest(app).get("/comments/"+ipi._id)
    .expect(200)
    .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(1)
        expect(response.body[0].nick).toBe("lukas")
    })
});

test('GET /comments/:placeid - ok', async () => {
    //dodajemy miejsce testowe
    let ipi = new Place({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    })
    ipi = await ipi.save()

    await supertest(app).post("/comments/" + ipi._id).set('Content-type', 'application/json').
    send({
        
            nick: 'lukas',
            title: 'good place',
            content: 'awesome place',
            rate: 5,
            dateOfVisit: Date.now()
    }).then(async (response) => {
        let comments;
        try {
            expect(response.status).toBe(201)
            comments = await Comment.find()
            expect(comments.length).toBe(1)
            expect(comments.nick).toBe("lukas")
        } catch (err) {

        }
    })
})

//prosty test parametryzowany
// test.each([[1, 2, 3], [2, 10, 12], [3, 9, 11], [3,9,12]])(
//     'parametrized test example', (a, b, result) => {
//         expect(a + b).toBe(result)
//     }
// )

// test('dummy test', () => {
//     expect(1 + 3).toBe(5)
//     expect(2 + 3).toBe(5)
// })
test.each([
    [{    
        title: 'good place',
        content: 'awesome place',
        rate: 5,
        dateOfVisit: Date.now()
    }, 400, 'Comment validation failed'],
    [{
        nick: 'lukas',    
        rate: 5,
        dateOfVisit: Date.now()
    }, 400, 'Comment validation failed'],
    [{
        nick: 'lukas',    
        title: 'good place',
        content: 'awesome place',
        rate: 5
    }, 400, 'Comment validation failed']
])('POST /comments/:placeid - parametrized',async (comment, status, message) => {
    let ipi = new Place({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    })
    ipi = await ipi.save()
    await supertest(app).post("/comments/" + ipi._id).set('Content-type', 'application/json').
    send(comment).then(async (response) => {
        let comments;
        expect(response.status).toBe(status)
        console.log(status)
        expect(response.body.message).toMatch(message)
        comments = await Comment.find()
        expect(comments.length).toBe(0)
        console.log(comments.length);
    })
})

test('GET /comments/:placeid - empty nick', async () => {
    //dodajemy miejsce testowe
    let ipi = new Place({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    })
    ipi = await ipi.save()

    await supertest(app).post("/comments/" + ipi._id).set('Content-type', 'application/json').
    send({
        
            title: 'good place',
            content: 'awesome place',
            rate: 5,
            dateOfVisit: Date.now()
    }).then(async (response) => {
        let comments;
            expect(response.status).toBe(400)
            expect(response.body.message).toMatch(/Comment validation failed/)
            comments = await Comment.find()
            expect(comments.length).toBe(0)
    })
})
exports.readData = function (req, res) {

};

//
exports.trainAndPredict = function (req, res) {
    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    //load heart training and testing data
    const heart = require('../../heart.json');
    const heartTesting = require('../../heart_test.json');
    console.log(heartTesting)
    //
    //

    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    var age = req.query.age;
    var sex = req.query.male;
    var cp = req.query.cp;
    var trestbps = req.query.trestbps;
    var chol = req.query.chol;
    var fbs = req.query.fbs;
    var restecg = req.query.restecg;
    var thalach = req.query.thalach;
    var exang = req.query.exang;

    const userDataValues = [{
        "age": parseInt(age),
        "sex": parseInt(sex),
        "cp": parseInt(cp),
        "trestbps": parseInt(trestbps),
        "chol":parseInt(chol),
        "fbs":parseInt(fbs),
        "restecg":parseInt(restecg),
        "thalach": parseInt(thalach),
        "exang": parseInt(exang),
    }]
    console.log(userDataValues);
    var epoch = req.query.epoch;
    var lr = req.query.lr;
    console.log('trainingData')
    const trainingData = tf.tensor2d(heart.map(item => [
        item.age,
        item.sex,
        item.cp,
        item.trestbps,
        item.chol,
        item.fbs,
        item.restecg,
        item.thalach,
        item.exang,
    ]))
    //
    //tensor of output for training data
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // Die_Live 1:       1,0
    // Die_Live 2:       0,1
    const outputData = tf.tensor2d(heart.map(item => [
        item.Die_Live === 1 ? 1 : 0,
        item.Die_Live === 2 ? 1 : 0
    ]))
    //console.log(outputData.dataSync())

    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(heartTesting.map(item => [
        item.age,
        item.sex,
        item.cp,
        item.trestbps,
        item.chol,
        item.fbs,
        item.restecg,
        item.thalach,
        item.exang,
    ]))
    console.log(testingData.dataSync())
    testingData.array().then(array => {
        console.log(array)
    })
    const userData = tf.tensor2d(
        userDataValues.map((item) => [
        item.age,
        item.sex,
        item.cp,
        item.trestbps,
        item.chol,
        item.fbs,
        item.restecg,
        item.thalach,
        item.exang
        ])
    );

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [9], // 19 input neurons (features)
        activation: "sigmoid",
        units: 100, //dimension of output space (first hidden layer)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [10], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 3, //dimension of final output (die or live)
    }))
    //add the first hidden layer
    // model.add(tf.layers.dense({
    //     inputShape: [15], //dimension of hidden layer (2/3 rule)
    //     activation: "sigmoid",
    //     units: 2, //dimension of final output (die or live)
    // }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(parseFloat(lr)),
        metrics: ['accuracy'],
    })
    console.log(model.summary())
    // train/fit the model for the fixed number of epochs
    const startTime = Date.now()
    //
    async function run() {
        const startTime = Date.now()
        await model.fit(trainingData, outputData,
            {
                //epochs: 1000,
                epochs: parseInt(epoch),
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        ) //fit
        //
        const results = model.predict(userData);
       // const results = model.predict(testingData);
        results.print()
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array[0][0])
            //console.log(array)
            var resultForData1 = array[0];
            //var resultForTest2 = array[1];
            //var resultForTest3 = array[2];
            var dataToSend = {row1: resultForData1
                //,row2: resultForTest2, row3: resultForTest3
            }
            console.log(resultForData1);
            res.status(200).send(dataToSend);
            //var resultForData1 = array[0];
            // res.render('results',
            //     {
            //         results: results,
            //         resultForTest1: resultForTest1,
            //         resultForTest2: resultForTest2,
            //         resultForTest3: resultForTest3
            //     }
            //)
        })
    } //end of run function
    run()
    //

};


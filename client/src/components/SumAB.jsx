import React, { useState }  from 'react';

const SumAB = () => {
    const [inputs, setInputs] = useState({
        valueA: "",
        valueB: "",
    });

    const [result, setResult] = useState("")

    const { valueA, valueB } = inputs;

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://3.35.167.253:3001/api/sum/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        .then(res => res.json())    
        .then(data => setResult(data.result))
        .catch(error => console.error(error))

    }

    const handleChange = (event) => {
        const { value, name } = event.target; //e.target에서 name과 value 추출
        setInputs({
            ...inputs,
            [name] : value
        });
    }

    const onReset = () => {
        setInputs({
            valueA: '',
            valueB: ''
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    value A :  
                    <input
                        type="text"
                        name="valueA"
                        value = {valueA}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    value B :  
                    <input
                        type="text"
                        name="valueB"
                        value = {valueB}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input type="submit"  value="Calculation"/>
                <input type="button" onClick={onReset} value="reset"/>
            </div>
        </form>
        <h2>{result}</h2>
        </>
    )

}

export default SumAB;
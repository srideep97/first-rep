    

    const form = document.querySelector('form')
    const search = document.querySelector('input')

    form.addEventListener('submit',(e) => {
        e.preventDefault()

        searchValue = search.value

        document.getElementById('messageOne').textContent = 'Loading'
        //document.getElementById('messageTwo').textContent = ''

        url = `http://localhost:3000/weather?address=${searchValue}`
        fetch(url).then((response) => {
            //console.log(response)
            response.json().then((data)=>{
                if(data.error){
                    document.getElementById('messageOne').textContent = data.error
                    //document.getElementById('messageTwo').textContent = ''
                    //console.log()
                }
                else{
                    document.getElementById('messageOne').textContent = data.data
                    //console.log(data)
                }
                
            })
        })

    })




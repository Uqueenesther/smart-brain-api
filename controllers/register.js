
const handleRegister = (req, res, db, bcrypt) =>{
    console.log( "is working")
    const {email, name, password} = req.body;
    console.log( password, "is password")
    console.log( email, "is email")
    if (!email || !name || !password){
       return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    console.log( hash, "is hash")
    db.transaction(trx =>{
        trx.insert({
          hash:hash,
          email:email  
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            console.log({loginEmail})
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0].email,
                name: name,
                joined: new Date()
            }).then(user =>{
              console.log(user[0])
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        
        // .catch(err=> res.status(400).json('unanble to register'))  
        .catch(err=>console.log(err))
    }

    module.exports = {
        handleRegister: handleRegister
    }
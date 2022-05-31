const passport = require('passport')
const fb = require('./firebase')
let client_id = "191991222868-dh355mfrv6a9ro40q8k1akqnfpj957fs.apps.googleusercontent.com"
let sec_key = "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"
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    const db = fb.firestore()
    const Users = db.collection('users').onSnapshot(snap=>{
        snap.forEach(doc=>{
            if(doc.data()['id'] === id){
                done(null,doc.data());
            }
              
        })
    });
    
    
    
})
/*
async function addData(profile,done) {
    const db = fb.firestore()
   
    
  
    
}*/
  
passport.use(new GoogleStrategy({
    clientID:client_id,
    clientSecret:sec_key,
    callbackURL:'/auth/google/callback'

},function(aToken,rToken,profile,done){
    const db = fb.firestore()
    let check = false
    const Users = db.collection('users').onSnapshot(snap=>{

        snap.forEach(doc=>{
            if(doc.data()['username'] === profile.displayName && doc.data()['id'] === profile.id){
                let a = doc.data()
                check = true
                done(null,a);
            }
            
        })
        if (!check){
            let d = {
                username: profile.displayName,
                id:profile.id
            }
            async function addData(d){
                const resp = await db.collection('users').add(d)
                console.log(resp)
                /*if (resp.id){
                    console.log(resp.id)
                    db.collection('users').onSnapshot(snap=>{

                        snap.forEach(doc=>{
                            if(doc.data()['username'] === profile.displayName && doc.data()['id'] === profile.id){
                                let a = doc.data()
                                return a
                                //done(null,a);
                            }
                            
                        })
                    })
                    
                } */
            }
            let s = addData(d)
            done(null,d)
            
            
            
            //done(null,resp)
        }
        
    });
    
    /*console.log(profile)
    const db = fb.firestore()
    const Users = db.collection('users').onSnapshot(snap=>{
        snap.forEach(doc=>{
            if(doc.data()['username'] == profile.displayName && doc.data().id == profile.id){
                done(doc.data())
            }
        })
    });
    */


}))
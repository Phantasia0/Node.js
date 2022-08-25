//콜백을 쓰는 패턴 중 하나 >> 콜백을 프로미스로 바꿈

function findAndSaveUser(Users){
    Users.findOne({}, (err, user)=>{
        if(err){
            return console.error(err);
        }

        user.name = 'zero';
        user.save((err)=>{
            if(err){
                return console.error(err);
            }
            Users.findOne({gender: 'm'}, (err,user)=>{
                //생략
            });
        });
    });
}

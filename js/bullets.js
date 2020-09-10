class bullets {
    constructor (game) {
        this.game = game
        this.speed = BULLET_SPEED
        this.size = BULLET_SIZE
        this.listHitBullet = []
        this.startHitSize = START_HIT_SIZE
        this.endHitSize = MAX_HIT_SIZE

        this.startTextHitSize = START_TEXT_HIT_SIZE
        this.endTextHitSize = MAX_TEXT_HIT_SIZE
    }

    update () {
        var newArray = []
        this.game.listBullets.forEach(el=>{
            if(el.y > 0 || el.x > 0 || el.x < this.game.width){
                var deg = el.deg

                var posX = Math.sin(deg) * this.speed * -1
                var posY = Math.cos(deg) * this.speed * -1

                var bulletPos = {
                    ...el,
                    x : el.x + posX, 
                    y: el.y + posY,
                }

                if(
                    el.x > this.game.monster.monsterHitBoxPosX && 
                    el.y > this.game.monster.monsterHitBoxPosY && 
                    el.x < this.game.monster.monsterHitBoxPosX + this.game.monster.hitBoxWidth && 
                    el.y < this.game.monster.monsterHitBoxPosY + this.game.monster.hitBoxHeight && !this.game.isMonsterReset
                ){
                    this.listHitBullet.push({
                        ...bulletPos , 
                        size : this.startHitSize,
                        textSize : this.startTextHitSize,
                        timing : 0
                    })
                    this.game.currentHP = this.game.currentHP - el.dmg >= 0 ? this.game.currentHP - el.dmg  : 0
                }else{
                    newArray.push(bulletPos)
                }

            }
        })

        this.game.listBullets = newArray
        this.hitMonster()
    }

    hitMonster () {
        var newArray = []
        this.listHitBullet.forEach(el => {
            if(el.timing < HIT_EFFECT_DURATION){
                var hitBulletObj = {
                    ...el,
                    size : (this.endHitSize * el.timing / HIT_EFFECT_DURATION),
                    textSize : (this.endTextHitSize * el.timing / HIT_EFFECT_DURATION),
                    timing : el.timing+=20
                }
                newArray.push(hitBulletObj)
            }
        })
        this.listHitBullet = newArray
    }

    draw () {
        this.game.listBullets.forEach( el => {
            this.game.ctx.beginPath()
            this.game.ctx.arc(
                el.x,
                el.y,
                this.size,
                0,
                Math.PI*2,
                false
            )
            this.game.ctx.closePath()
            this.game.ctx.fillStyle = '#0000ff'
            this.game.ctx.fill()
        })

        this.listHitBullet.forEach(el => {
            this.game.ctx.beginPath()
            this.game.ctx.arc(
                el.x,
                el.y,
                el.size,
                0,
                Math.PI*2,
                false
            )
            this.game.ctx.closePath()
            this.game.ctx.fillStyle = `rgba(255,255,255,${el.timing / HIT_EFFECT_DURATION})`
            this.game.ctx.fill()
            this.game.ctx.fillStyle = `rgba(255,0,0,${el.timing / HIT_EFFECT_DURATION})`
            this.game.ctx.font = `${el.textSize}px Arial`
            this.game.ctx.textAlign = "center";
            this.game.ctx.textBaseline = "bottom";

            this.game.ctx.fillText(
                el.dmg, 
                el.x, 
                el.y - el.size, 
            )
        })
    }
}
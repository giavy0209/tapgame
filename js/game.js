class game {
    constructor(width, height) {
        this.width = width
        this.height = height

        this.clickPosX = null
        this.clickPosY = null

        this.stage = 1
        this.subStage = 1

        this.startHP = MONSTER_START_HP * this.stage + ((this.stage - 1) * 0.1 * MONSTER_START_HP)
        this.currentHP = this.startHP

        this.dmg = TANK_START_DMG

        this.dmglv = 1

        this.dmgIncrease = this.dmg * (this.dmglv )

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.topZoneHeight = this.height * TOP_ZONE_SIZE
        this.monsterZoneHeight = this.height * MONSTER_ZONE_SIZE
        this.tankZoneHeight = this.height * TANK_ZONE_SIZE
        this.bottomZoneHeight = this.height * BOTTOM_ZONE_SIZE

        this.isMonsterReset = false
        this.resetTime = 0

        this.listBullets = []

        document.body.appendChild(this.canvas)

        this.upgradeButton = new upgradeButton(this)
        this.monster = new monster(this)
        this.monsterhp = new monsterhp(this)
        this.tank = new tank(this)
        this.bullets = new bullets(this)
        
        this.listenEvent()
        this.loop()
        this.loopShot()
    }

    drawTopZone () {
        this.ctx.beginPath();
        this.ctx.moveTo(0 , 0)
        this.ctx.lineTo(this.width , 0)
        this.ctx.lineTo(this.width , this.topZoneHeight)
        this.ctx.lineTo(0 , this.topZoneHeight)
        this.ctx.closePath()
        this.ctx.fillStyle = '#fff'
        this.ctx.fill()
    }

    drawMonsterZone () {
        this.ctx.fillStyle = '#ff00ff'
        this.ctx.fillRect(0 , this.topZoneHeight , this.width, this.monsterZoneHeight)
    }

    drawTankZone () {
        this.ctx.fillStyle = '#fac800'
        this.ctx.fillRect(0 , this.topZoneHeight + this.monsterZoneHeight, this.width, this.tankZoneHeight)
    }


    drawBottomZone () {
        this.ctx.fillStyle = '#ff0000'
        this.ctx.fillRect(0 , this.topZoneHeight + this.tankZoneHeight+ this.monsterZoneHeight , this.width, this.bottomZoneHeight)
    }

    
    listenEvent() {
        this.canvas.addEventListener('click', e =>{
            var x = e.pageX
            var y = e.pageY
            this.clickPosX = x
            this.clickPosY = y
            if(y <= this.height - this.bottomZoneHeight){
                this.listBullets.push({
                    x : (this.tank.posX + this.tank.bodyWidth/2) + (-Math.sin(this.tank.gunAngle) * this.tank.gunHeight) , 
                    y : this.tank.posY - this.tank.bodyHeight + (-Math.cos(this.tank.gunAngle) * this.tank.gunHeight),
                    deg : ((((this.tank.posX + this.tank.bodyWidth / 2) - this.width / 2) / (this.width / 2) )  * Math.PI/4) + ((Math.random() * (Math.PI/30  - Math.PI/30 * (-1))) + Math.PI/30 * (-1)),
                    dmg : this.dmg
                })
            }else{

            }
        })
    }

    loopShot() {
        setTimeout(() => {
            this.loopShot()
            this.listBullets.push({
                x : (this.tank.posX + this.tank.bodyWidth/2) + (-Math.sin(this.tank.gunAngle) * this.tank.gunHeight) , 
                y : this.tank.posY - this.tank.bodyHeight + (-Math.cos(this.tank.gunAngle) * this.tank.gunHeight),
                deg : ((((this.tank.posX + this.tank.bodyWidth / 2) - this.width / 2) / (this.width / 2) )  * Math.PI/4) + ((Math.random() * (Math.PI/30  - Math.PI/30 * (-1))) + Math.PI/30 * (-1)),
                dmg : this.dmg
            })
        }, 30);
    }

    loop () {
        
        this.update()
        this.draw()
        setTimeout(() => {
            this.loop()
        }, 20);
    }

    update () {
        if(this.isMonsterReset){
            this.resetTime +=20
            if(this.resetTime >= MONSTER_RESET_TIME){
                this.resetTime = 0
                this.isMonsterReset = false
            }
        }
        if(this.currentHP <= 0){
            this.isMonsterReset = true
            this.subStage++
            if(this.subStage > 10){
                this.stage++
                this.subStage = 1
                return
            }
            this.startHP = MONSTER_START_HP * this.stage + ((this.stage - 1) * 0.1 * MONSTER_START_HP)
            this.currentHP = this.startHP
        }

        this.tank.update()
        this.bullets.update()
        this.monster.update()
        this.monsterhp.update()
        this.upgradeButton.update()
    }
    

    draw () {
        this.ctx.clearRect(0 , 0 , this.width, this.height)
        this.drawTopZone()
        this.drawMonsterZone()
        this.drawTankZone()
        this.drawBottomZone()

        this.monsterhp.draw()
        this.monster.draw()
        this.bullets.draw()
        this.tank.draw()
        this.upgradeButton.draw()

    }
}
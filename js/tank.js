class tank {
    constructor (game) {
        this.game = game
        this.bodyWidthRatio = TANK_BODY_WIDTH
        this.bodyHeightRatio = TANK_BODY_HEIGHT

        this.gunWidthRatio = TANK_GUN_WIDTH
        this.gunHeightRatio = TANK_GUN_HEIGHT

        this.bodyWidth = this.game.width * this.bodyWidthRatio
        this.bodyHeight = this.bodyWidth * this.bodyHeightRatio
        this.gunWidth = this.game.width * this.gunWidthRatio
        this.gunHeight = this.gunWidth*this.gunHeightRatio

        this.posX = 0
        this.posY = this.game.topZoneHeight + this.game.tankZoneHeight + this.game.monsterZoneHeight
        this.changePos = TANK_SPEED

        this.gunAngle = ((this.posX + this.bodyWidth / 2) - this.game.width / 2) / (this.game.width / 2)   * Math.PI/4

        
    }

    shot () {
        
    }

    update () {
        this.bodyWidth = this.game.width * this.bodyWidthRatio
        this.gunWidth = this.game.width * this.gunWidthRatio
        this.posX += this.changePos
        this.gunAngle = ((this.posX + this.bodyWidth / 2) - this.game.width / 2) / (this.game.width / 2)   * Math.PI/4
        if(this.posX + this.bodyWidth > this.game.width){
            this.changePos = -TANK_SPEED
        }
        if(this.posX < 0){
            this.changePos = TANK_SPEED
        }

    }

    draw () {
        this.game.ctx.beginPath()
        this.game.ctx.moveTo(this.posX + this.bodyWidth/2, this.posY + 10 - this.bodyHeight)
        this.game.ctx.lineTo(
            (this.posX + this.bodyWidth/2) + (-Math.sin(this.gunAngle) * this.gunHeight) , 
            this.posY - this.bodyHeight + (-Math.cos(this.gunAngle) * this.gunHeight)
        )
        this.game.ctx.strokeStyle = '#ccc'
        this.game.ctx.lineWidth = this.gunWidth
        this.game.ctx.stroke()

        this.game.ctx.fillStyle = '#00ff00'
        this.game.ctx.fillRect(this.posX, this.posY - this.bodyHeight , this.bodyWidth, this.bodyHeight)

    }
}
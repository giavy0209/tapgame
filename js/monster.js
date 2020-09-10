class monster {
    constructor(game) {
        this.game = game
        this.monsterWidthRatio = MONSTER_WIDTH
        this.monsterHeightRatio = MONSTER_HEIGHT

        this.monsterHitBoxWidthRatio = MONSTER_HIT_BOX_WIDTH
        this.monsterHitBoxHeightRatio = MONSTER_HIT_BOX_HEIGHT

        this.width = this.game.width * this.monsterWidthRatio
        this.height = this.game.height * this.monsterHeightRatio

        this.hitBoxWidth = this.game.width * this.monsterHitBoxWidthRatio
        this.hitBoxHeight = this.game.height * this.monsterHitBoxHeightRatio


        this.monsterPosX = this.game.width / 2 - this.width / 2
        this.monsterPosY = this.game.topZoneHeight + this.game.monsterZoneHeight - this.height

        this.monsterHitBoxPosX = this.monsterPosX + this.hitBoxWidth / 2
        this.monsterHitBoxPosY = this.monsterPosY + (this.height - this.hitBoxHeight)/2

        this.hp = MONSTER_START_HP
    }

    update() {

    }

    draw(){
        if(!this.game.isMonsterReset){
            this.game.ctx.fillStyle = '#00ff00'
            this.game.ctx.fillRect( this.monsterPosX, this.monsterPosY, this.width, this.height)
    
        }else{
            this.game.ctx.fillStyle = `rgba(255,0,0,${1 - (this.game.resetTime / MONSTER_RESET_TIME)})`
            this.game.ctx.fillRect( this.monsterPosX, this.monsterPosY, this.width, this.height)
    
        }
        
    }
}
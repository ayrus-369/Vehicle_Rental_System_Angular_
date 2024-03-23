export class BookInputDto {
    constructor(public customerId?:number, public customerEmailId?:string,public vehiclleId?:number,public pickupDate?:Date,public dropDate?:Date,public dropLocation?:string){}
}

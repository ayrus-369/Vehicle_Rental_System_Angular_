export class BookInputDto {
    

        constructor(
             public customerId?:number,
             public customerEmailId?:string,
             public vehicleId?:number,
             public pickupDate?:string,
             public dropDate?:string,
             public dropLocation?:string)
             {}
}

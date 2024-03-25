export class Payment 
{
    constructor(
        
        public customerId?:number,
    public customerEmailId?:string,
    public vehicleId?:number,
        public amount?: number     
    ) {}
}
// private Integer bookingId;
// private Double amount;
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMS.Entity
{
    using System;
    
    public partial class ReportsBankingCheckRegisterSummaryJSON_Result
    {
        public string CheckNo { get; set; }
        public string PaymentDate { get; set; }
        public string VENDorNumber { get; set; }
        public string PrintOncheckAS { get; set; }
        public string TransactionNumber { get; set; }
        public string PayBy { get; set; }
        public Nullable<int> CheckRunID { get; set; }
        public Nullable<decimal> PaidAmount { get; set; }
        public int CompanyPeriod { get; set; }
        public string Status { get; set; }
    }
}

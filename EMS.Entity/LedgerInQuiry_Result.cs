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
    
    public partial class LedgerInQuiry_Result
    {
        public int Accountid { get; set; }
        public int COAID { get; set; }
        public string AcctDescription { get; set; }
        public string Acct { get; set; }
        public string COAString { get; set; }
        public string TransactionCode { get; set; }
        public string LineDescription { get; set; }
        public bool ThirdParty { get; set; }
        public string VendorName { get; set; }
        public string RefVendor { get; set; }
        public Nullable<int> VendorID { get; set; }
        public string batchnumber { get; set; }
        public string TransactionNumber { get; set; }
        public string Source { get; set; }
        public int ClosePeriod { get; set; }
        public string DocumentNo { get; set; }
        public Nullable<System.DateTime> DocDate { get; set; }
        public string Description { get; set; }
        public string CheckNumber { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<decimal> BeginingBal { get; set; }
        public string Location { get; set; }
        public string TaxCode { get; set; }
    }
}

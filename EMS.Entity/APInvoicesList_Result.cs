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
    
    public partial class APInvoicesList_Result
    {
        public string InvoiceTransactionNumber { get; set; }
        public string InvoiceCompanyCode { get; set; }
        public string InvoiceVendorName { get; set; }
        public Nullable<int> InvoiceLines { get; set; }
        public string PaymentTransactionNumber { get; set; }
        public string PaymentCheckNumber { get; set; }
        public Nullable<System.DateTime> PaymentCheckDate { get; set; }
        public string PayBy { get; set; }
        public string CheckStatus { get; set; }
        public Nullable<int> PaymentID { get; set; }
        public int InvoiceID { get; set; }
        public string InvoiceNumber { get; set; }
        public int CompanyID { get; set; }
        public int VendorID { get; set; }
        public string VendorName { get; set; }
        public bool ThirdParty { get; set; }
        public string WorkRegion { get; set; }
        public string Description { get; set; }
        public decimal OriginalAmount { get; set; }
        public decimal CurrentBalance { get; set; }
        public Nullable<decimal> NewItemAmount { get; set; }
        public Nullable<decimal> Newbalance { get; set; }
        public string BatchNumber { get; set; }
        public int BankID { get; set; }
        public System.DateTime InvoiceDate { get; set; }
        public Nullable<System.DateTime> Duedate { get; set; }
        public string CheckGroupNumber { get; set; }
        public string InvoiceStatus { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public int ProdID { get; set; }
        public decimal Amount { get; set; }
        public int ClosePeriodID { get; set; }
        public bool RequiredTaxCode { get; set; }
        public string MirrorStatus { get; set; }
        public string BRStatus { get; set; }
    }
}
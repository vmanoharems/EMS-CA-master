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
    
    public partial class GetInvoiceLineDetailById_Result
    {
        public int InvoiceID { get; set; }
        public int InvoiceLineID { get; set; }
        public decimal Amount { get; set; }
        public string LineDescription { get; set; }
        public string COAString { get; set; }
        public int COAID { get; set; }
        public string Transactionstring { get; set; }
        public bool ClearedFlag { get; set; }
        public string TaxCode { get; set; }
        public string TransStr { get; set; }
        public Nullable<int> Polineid { get; set; }
        public string PONumber { get; set; }
        public Nullable<int> POID { get; set; }
        public Nullable<int> SetId { get; set; }
        public string SetCode { get; set; }
        public Nullable<int> SeriesId { get; set; }
        public string SeriesCode { get; set; }
        public string VendorName { get; set; }
        public string Status { get; set; }
    }
}

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
    using System.Collections.Generic;
    
    public partial class CAUserAdmin
    {
        public CAUserAdmin()
        {
            this.UserProductions = new HashSet<UserProduction>();
        }
    
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AuthenticationCode { get; set; }
        public Nullable<System.DateTime> PasswordModiedDate { get; set; }
        public string Accountstatus { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<System.DateTime> Createddate { get; set; }
        public Nullable<System.DateTime> modifieddate { get; set; }
        public Nullable<int> createdby { get; set; }
        public Nullable<int> modifiedby { get; set; }
        public Nullable<bool> AdminFlag { get; set; }
    
        public virtual ICollection<UserProduction> UserProductions { get; set; }
    }
}

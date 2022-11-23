﻿CREATE TABLE [dbo].[tblVendor] (
  [VendorID] [int] IDENTITY,
  [VendorNumber] [nvarchar](30) NULL,
  [VendorName] [nvarchar](100) NULL,
  [FirstName] [nvarchar](30) NULL,
  [MiddleName] [nvarchar](30) NULL,
  [LastName] [nvarchar](30) NULL,
  [PrintOncheckAS] [nvarchar](100) NULL,
  [W9Country] [nvarchar](100) NULL,
  [W9Address1] [nvarchar](50) NULL,
  [W9Address2] [nvarchar](50) NULL,
  [W9Address3] [nvarchar](50) NULL,
  [W9City] [nvarchar](50) NULL,
  [W9State] [nvarchar](50) NULL,
  [W9Zip] [nvarchar](50) NULL,
  [RemitCountry] [nvarchar](100) NULL,
  [RemitAddress1] [nvarchar](50) NULL,
  [RemitAddress2] [nvarchar](50) NULL,
  [RemitAddress3] [nvarchar](50) NULL,
  [RemitCity] [nvarchar](50) NULL,
  [RemitState] [nvarchar](50) NULL,
  [RemitZip] [nvarchar](50) NULL,
  [UseRemmitAddrs] [bit] NOT NULL CONSTRAINT [DF_UseRemmitAddrs] DEFAULT (1),
  [Qualified] [nvarchar](50) NULL,
  [Currency] [nvarchar](50) NULL,
  [DefaultAccount] [nvarchar](50) NULL,
  [LedgerAccount] [nvarchar](50) NULL,
  [TaxID] [nvarchar](30) NULL,
  [Type] [nvarchar](50) NULL,
  [TaxFormOnFile] [bit] NULL,
  [TaxFormExpiry] [datetime] NULL,
  [DefaultForm] [nvarchar](50) NULL,
  [TaxName] [nvarchar](50) NULL,
  [ForeignTaxId] [nvarchar](50) NULL,
  [PaymentType] [nvarchar](50) NULL,
  [Duecount] [int] NULL,
  [Duetype] [nvarchar](30) NULL,
  [netpercentage] [decimal](18, 2) NULL,
  [PaymentAccount] [nvarchar](50) NULL,
  [Required] [bit] NULL,
  [StudioVendorNumber] [nvarchar](50) NULL,
  [IsStudioApproved] [bit] NULL,
  [Status] [bit] NULL,
  [Warning] [bit] NULL,
  [CreatedDate] [datetime] NULL,
  [CreatedBy] [int] NULL,
  [ModifiedDate] [datetime] NULL,
  [ModifiedBy] [int] NULL,
  [ProdID] [int] NULL,
  [COAId] [int] NULL,
  [COAString] [nvarchar](200) NULL,
  [TransactionCodeString] [nvarchar](200) NULL,
  [SetId] [int] NULL,
  [SeriesId] [int] NULL,
  [DefaultDropdown] [nvarchar](50) NULL,
  CONSTRAINT [PK_Vendors] PRIMARY KEY CLUSTERED ([VendorID]),
  CONSTRAINT [NOBLANK_tblVendor_VendorName] CHECK ([VendorName]<>'')
)
GO

CREATE INDEX [Vendor_Name]
  ON [dbo].[tblVendor] ([VendorName])
GO
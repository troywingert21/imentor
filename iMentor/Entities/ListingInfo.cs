﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using iMentor.Models;
using System.Web.Mvc;

namespace iMentor.Entities
{
    [DataContract]
    public class ListingInfo
    {
        [DataMember]
        public int ID { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public Nullable<System.DateTime> StartDate { get; set; }

        [DataMember]
        public Nullable<System.DateTime> EndDate { get; set; }

        [DataMember]
        public string Area { get; set; }

        [DataMember]
        public string Frequency { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public string Mentor { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string HangoutUrl { get; set; }

        [DataMember]
        public Nullable<int> TeacherId { get; set; }

        [DataMember]
        public bool Open { get; set; }

        [DataMember]
        public string Teacher { get; set; }

        [AllowAnonymous]
        public string GetTeacherUserName(ListingModel listing)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var teacher = db.iMentorUsers.Where(x => x.Id == listing.TeacherId).FirstOrDefault();
                var result = teacher.UserName;

                return result;
            }
        }

        [AllowAnonymous]
        public int GetTeacherIdByName(string teacherName)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var role = db.iMentorUsers.Where(x => x.UserName.Equals(teacherName)).FirstOrDefault();
                var result = role.Id;

                return result;
            }
        }
    }
}